# AppFlow.md — TutorTrust PK
### End-to-End User Journey (Signup → Login → Core Loop → End)

## Flow 1: Signup
1. User lands on `/` → clicks "Sign Up"
2. `/signup` — chooses a role via an accessible tab: **Parent/Student** or **Tutor** (`role="tablist"`, `aria-selected`)
3. Fills Full Name, Email, Phone Number, Password; checks "I agree to Terms and Escrow guidelines"
4. On submit: Firebase Auth creates the user; role is stored in Firestore `users/{uid}`; a phone OTP is sent
5. Redirect to `/verify-phone`

## Flow 2: Phone Verification
1. `/verify-phone` — six OTP boxes; "We sent a code to +92 XXX XXXXXXX"
2. 60-second cooldown before "Resend Code" becomes active
3. On success, the user's `phoneVerified` flag is set true in Firestore
4. Dashboard access is blocked (redirect back here) until this flag is true

## Flow 3: Login
1. `/login` — email + password only, no role tab
2. 5 failed attempts → 15-minute lockout
3. On success, role is read from Firestore and the user is redirected to `/dashboard` (Parent) or `/tutor-dashboard` (Tutor)
4. First-ever login also triggers the Welcome Tour (3 slides: verified tutors, escrow protection, booking) — "Skip" always available

## Flow 4: Core Loop — Parent Finds, Books, and Completes a Session
1. `/dashboard` — shows minutes... i.e. upcoming/past sessions, escrow status per session, "Book Another Session"
2. `/find-tutors` — filters: Subject, City, Hourly Rate, "Verified Only" toggle → tutor cards (photo, name, qualification, rating, Verified badge, rate)
3. Empty state ("No tutors match these filters") includes "Reset Filters"
4. `/tutor/[id]` — tutor profile: qualifications, badge, subjects, reviews → "Book a Session" or "Message Tutor"
5. `/booking/[tutorId]` — select date/time → choose payment method (Card/EasyPaisa/JazzCash, simulated for the 11-day build) → escrow stepper shows **Payment Held**
6. Booking confirmed → session enters **Session Scheduled**
7. At session time, `/session/[id]/call` — "Join Call" (with full context announced, e.g. "Join Physics session with Ali Hassan")
8. In-call controls (Tab-navigable): Mute/Unmute, Camera On/Off, Speaker, **Screen Share**, Chat, Raise Hand, End Call
9. If connection degrades: "Connection unstable" message + one-tap "Switch to audio-only"; if the call drops, "Rejoin Call" is immediately accessible
10. Call ends → "Session ended. Duration: X minutes" → **Confirm Session Completed** button → escrow moves to **Session Confirmed** → Cloud Function sets **Tutor Paid**
11. Parent is prompted to leave a review (1–5 stars + comment)

## Flow 5: Dispute Path (When Something Goes Wrong)
1. From a session, parent selects "Dispute/Refund"
2. Chooses a reason (Tutor didn't attend / Quality concern / Other), adds detail, optionally uploads evidence
3. Escrow status becomes **Disputed**; release is halted
4. Resolved manually (via Firebase Console for this 11-day build) to either release or refund

## Flow 6: Tutor Side
1. Tutor signs up → verifies phone → lands on `/tutor-dashboard` with status "Verification Pending"
2. `/tutor-dashboard/verification` — uploads CNIC front/back + degree image (all as images, not PDF)
3. Admin manually reviews (via Firebase Console for this build) → sets `verified: true`
4. Once verified, the tutor's profile becomes bookable and appears in Find Tutors results
5. Tutor dashboard shows Upcoming Sessions, Pending (Escrow) Amount, Released Payments; session cards have "Join Call" and "Contact Parent"
6. `/tutor-dashboard/payout` — tutor enters JazzCash/EasyPaisa/bank details (used once live payments are added post-demo)

## Flow 7: Messaging (Available Throughout)
1. `/messages` — conversation list (left) + open thread (right)
2. A visible reminder: "For your safety, keep payment discussions within the app"
3. Messages are scanned before saving; contact-info patterns are blocked with a warning to the sender

## Flow 8: Reschedule / Cancel / No-Show
1. From a booked session, "Cancel" or "Reschedule" is available
2. Rescheduling updates the booking's *current confirmed* time and immediately notifies the other party
3. The 15-minute no-show check always uses the current confirmed time, never the original booking time
4. If no-show is triggered, the session automatically enters the dispute flow

## Flow 9: End / Logout
1. "Logout" is always available in the navbar (rightmost, inside the Profile/Avatar dropdown, below a divider)
2. Firebase Auth `signOut()` clears the session → redirect to `/`
