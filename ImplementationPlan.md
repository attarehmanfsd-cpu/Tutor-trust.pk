# ImplementationPlan.md — TutorTrust PK
### 11-Day Build Plan (Sep 1 – Sep 11, 2026), Presentation Sep 12, 3-Person Team, Vibe-Coded via Google Antigravity

**Timeline correction note:** The original plan assumed an Aug 29 start (14 build days before a Sep 12 deadline). The actual start date was Sep 1 (two days were needed for other commitments before building began). This plan reflects the real, corrected timeline: **11 build days (Sep 1–11), with Sep 12 reserved for the presentation itself** — no new building on presentation day.

**Team:**
- **Moutter Rasool (Builder):** directs Google Antigravity through each phase below. The builder is visually impaired and works via screen reader — see Rules.md for the communication requirements this places on Antigravity.
- **Mudassar Jutt (SEO & Content):** writes landing-page copy, legal-page drafts, FAQ content, sample tutor profiles/reviews, and SEO keyword research, in parallel with development — not assigned coding tasks.
- **Muzaffar Abbas (Tester):** after each phase's Vercel deployment goes live, uses the app as a real user would and reports issues in plain language in the team WhatsApp group.

**Workflow:** Antigravity commits → pushes to GitHub → Vercel auto-deploys → live link shared in WhatsApp group → Muzaffar tests → feedback discussed together before the next phase starts. Antigravity should handle as much of this end-to-end as possible (setup, coding, committing, pushing) so the builder's time goes to review and direction rather than manual steps Antigravity can perform itself.

---

## Day 1 (Sep 1): Setup
- Firebase project created; Email/Password + Phone (OTP) authentication enabled
- Firestore database created; initial Security Rules written per TRD.md Section 3 (even a minimal version — never leave the database open)
- Firebase Storage bucket created (private by default)
- React + TypeScript (Vite) + Tailwind project scaffolded; GitHub repo connected; Vercel connected with confirmed auto-deploy on a placeholder page
- VideoSDK.live account created; **explicitly confirm screen-share and adaptive-bitrate support** before relying on it further
- **Checkpoint:** a blank deployed page is live at a Vercel URL, shared in the WhatsApp group

## Days 2–3 (Sep 2–3): Auth, Navigation, Tutor Discovery
- Build `/signup` (role tabs), `/verify-phone`, `/login`, `/forgot-password`, `/reset-password`
- Build the header (Design.md Section 4) and footer (Section 5), shared across all pages
- Build `/find-tutors` with filters (Subject, City, Verified-only) and the empty state
- **Checkpoint:** a user can sign up, verify their phone, log in, and see Find Tutors with sample tutor cards

## Days 4–5 (Sep 4–5): Tutor Profiles, Booking, Escrow Stepper
- Build `/tutor/[id]` profile page
- Build `/booking/[tutorId]` with date/time selection and the simulated payment step
- Implement the escrow status stepper UI and the underlying `escrow_transactions` Cloud Function logic (Held → Scheduled)
- **Checkpoint:** a parent can view a tutor profile, book a session, and see it on their dashboard with status "Payment Held"

## Days 6–7 (Sep 6–7): Video Call and Chat — Highest Risk Phase
- Integrate VideoSDK.live into `/session/[id]/call`: Mute, Camera, Speaker, **Screen Share**, Chat, Raise Hand, End Call
- Implement audio-only fallback and "Connection unstable" / "Rejoin Call" behaviors (TRD.md Section 6) — test on an actual weaker connection, not just office/home Wi-Fi, given documented Pakistani connectivity conditions
- Build `/messages` with real-time Firestore listeners and the `scanChatMessage` contact-detection function
- **Checkpoint:** two test accounts can join a video call with screen share, and chat contact-detection works

## Days 8–9 (Sep 8–9): Tutor Verification and Dashboards
- Build `/tutor-dashboard/verification` (document upload); manual admin review via Firebase Console (no dedicated Admin Dashboard in this build — see PRD.md)
- Build the full Parent Dashboard and Tutor Dashboard (session lists, escrow amounts, review submission, dispute filing)
- Implement the reschedule-notification-sync fix and no-show handling exactly per TRD.md Section 4 — verify a rescheduled session does not trigger a false no-show
- **Checkpoint:** the full loop works end-to-end: signup → book → verify tutor → complete session → confirm → review

## Day 10 (Sep 10): Accessibility Pass
- Real-device screen-reader testing (TalkBack and NVDA) per Design.md Section 7 — specifically escrow-status announcements, notification updates, form labels, video-call event announcements
- Fix issues found immediately — do not defer to "later"

## Day 11 (Sep 11): Final Testing and Presentation Prep
- Full end-to-end run-through with all three team members
- Bug fixes from Muzaffar's testing feedback
- Deployment polish (loading, error, and empty states all present)
- Presentation rehearsal

## Sep 12: Presentation Day
- No new building — buffer time only, in case something needs a last fix before presenting

---

## Explicit Risk Notes
- **Video call reliability (Days 6–7)** is the single biggest technical risk given documented Pakistani connectivity issues — scheduled with dedicated days and tested deliberately on a weaker connection, not assumed to "just work."
- **No Admin Dashboard** is built in this window — the Firebase Console is the interim admin tool. Check verification/dispute status daily so it doesn't silently become a bottleneck.
- **Payment is simulated** — no build time should go to live JazzCash/EasyPaisa integration during these 11 days; that is the next phase after the presentation.
- **The compressed timeline (11 days vs. the original 14) means Antigravity should be given maximum latitude to complete each day's scope autonomously** — the builder should review completed work and give direction for the next step, rather than manually performing steps Antigravity can already do (see Rules.md).
