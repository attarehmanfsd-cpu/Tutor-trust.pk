# TRD.md — TutorTrust PK
### Technical Requirements Document

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + TypeScript (Vite) | Best-supported by current agentic AI IDEs (Google Antigravity, Cursor, Claude Code, Windsurf); fast build times |
| Backend | Firebase Cloud Functions | Escrow logic, booking rules, payment-status management, chat content scanning |
| Database | Firebase Firestore | Users, tutors, bookings, escrow-transaction records |
| Authentication | Firebase Auth | Email/password (unlimited, free) + Phone OTP (free up to 10,000 verifications/month) |
| File Storage | Firebase Storage | CNIC/degree verification images — **images only, not PDF** |
| Video Calling | VideoSDK.live | Free tier: 10,000 participant-minutes/month, recurring monthly, no branding. Must support screen share and, ideally, adaptive bitrate — verify this explicitly before committing (see Section 6) |
| In-App Chat | Firebase Firestore (real-time listeners) | No additional service needed |
| Payments | JazzCash / EasyPaisa API + internal escrow ledger (Firestore) | Stripe does not support Pakistani merchant accounts. **Simulated for the 11-day demo** — see PRD.md Section 5 |
| Styling | Tailwind CSS | Accessible, responsive, AI-generatable |
| Access Control | Firestore Security Rules | Enforces role-based data access at the database level — not optional (see Section 3) |
| Hosting | Vercel | Connected to GitHub; auto-deploys on every push |
| Version Control | GitHub | — |
| Build Method | Google Antigravity | Agent-first IDE with integrated terminal and Git support |

**Cost:** $0 at MVP scale. Firebase Spark (free) plan covers Auth/Firestore/Storage. Cloud Functions require the Blaze plan (a card must be linked), but Blaze's free quota covers MVP usage — set a $1–2 budget alert in the Firebase Console as a safeguard.

## 2. System Architecture (Data Flow)

```
[Browser: React App]
      |
      | Signup/Login → Firebase Auth (+ phone OTP)
      | Upload verification docs → Firebase Storage (direct client upload, never through a custom server)
      | Book session → Cloud Function validates balance/availability → creates Firestore booking + escrow record
      v
[Firebase Cloud Functions]
      |
      | createEscrowTransaction — creates a "held" record on booking
      | releaseEscrowPayment — triggered on parent confirmation; sets status "released"
      | createVideoRoom — calls VideoSDK.live API to provision a session room
      | scanChatMessage — regex/keyword scan before a chat message is persisted
      | handleNoShow — 15-minute timeout check tied to the booking's *current confirmed* time
      | sendNotification — writes to the notifications collection
      v
[Firestore Database] ← Security Rules enforce role-based read/write on every document
      |
      v
[Browser: real-time listeners] → Dashboards, Messages, Notifications update live
```

## 3. Firestore Security Rules (Mandatory)

- A parent may only read/write their own bookings and student records (`parent_id == auth.uid()`).
- A tutor may only read/write their own sessions (`tutor_id == auth.uid()`).
- No user may modify their own `role` or `verified` field — only a Cloud Function (using the Admin SDK / service context) may do so.
- `escrow_transactions` documents may only be written by Cloud Functions, never directly by a client — this prevents a user from marking their own payment as released.
- Verification documents in Storage are private; Storage Security Rules restrict a tutor to their own uploaded files.

## 4. Escrow Payment Lifecycle

1. **Payment Held** — parent confirms booking + pays (simulated for the 11-day demo). A Firestore `escrow_transactions` record is created with `status: "held"`.
2. **Session Scheduled** — booking confirmed with a fixed date/time.
3. **Session Confirmed** — parent confirms, after the session, that it took place (`Confirm Session Completed` button).
4. **Tutor Paid** — Cloud Function sets `status: "released"` (in production, this triggers the actual payout call).

**Dispute path:** parent files a dispute → `status: "disputed"` → release is halted until manually reviewed (via Firebase Console for this build) → resolved to either `"released"` or `"refunded"`.

**No-show handling:** if neither party joins the video call within 15 minutes of the scheduled time, the session auto-marks as a no-show and enters the dispute flow. **Important:** this check must use the booking's *current confirmed* time — if a session was rescheduled, the no-show timer must follow the new time, not the original one, and the other party must be notified immediately when a reschedule happens. This was an identified gap in an earlier draft and is now a required behavior, not an optional refinement.

## 5. Contact-Detection (Chat Scanning)

A Cloud Function (`scanChatMessage`) scans each chat message before it is saved:
- Regex pattern matching for phone-number-like sequences
- Keyword matching for terms like "WhatsApp," "call me on," etc.
- Matching messages are blocked with a visible warning to the sender

**Documented limitation:** this cannot catch a phone number shared as an image, spelled out in words ("zero three zero zero"), or spoken verbally during a video call. This is a known, accepted limitation consistent with industry practice (established platforms like Tutor.com and Skooli rely on session recording rather than perfect real-time blocking). The Terms of Service must explicitly state that circumventing contact-detection by any method is a bannable offense.

**Recording policy:** video-call recording defaults to **ON** for any tutor without an established verified session history, and becomes optional (with parental consent) afterward.

## 6. Connectivity Resilience (Required — Pakistani Network Conditions)

Pakistan ranks 98th globally for mobile internet and 144th for fixed broadband; connectivity issues (including in major cities) are a documented, recurring reality, not an edge case. Required design responses:

- Confirm VideoSDK.live supports adaptive bitrate / automatic quality degradation — test this explicitly during the video-call integration phase, do not assume it.
- Provide a one-tap "Switch to audio-only" control during a call.
- Show a plain-language connection-quality indicator (e.g. "Connection unstable"), paired with a screen-reader announcement.
- Provide an immediately accessible "Rejoin Call" action from the session page — call drops should be designed for, not treated as exceptional.

## 7. File Upload Security

- Uploads go directly from the browser to Firebase Storage (never through a custom backend server).
- Allowed types: images only (`.jpg`, `.png`, `.webp`) — no PDF.
- Max file size: 5MB per document.
- Filenames are randomized server-side (UUID-based); the original filename is never exposed.
- Both frontend and backend validate file type/size (frontend checks are bypassable, so the backend check is mandatory).

## 8. Brute-Force / Account Security

- 5 failed login attempts → 15-minute account lockout (in addition to Firebase Auth's own rate-limiting).
- MFA is recommended for a later phase (admin access first, tutor accounts optionally after), not required for the 11-day build.

## 9. Non-Functional Requirements

- Max upload/session file size: 5MB per document, per Section 7.
- Background jobs (Cloud Functions) should have a timeout and at most one retry so a stuck job doesn't block a user indefinitely.
- All Stripe/JazzCash/EasyPaisa webhook handlers (once live payments are added post-demo) must verify signatures before processing — non-negotiable.
