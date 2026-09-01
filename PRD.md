# PRD.md — TutorTrust PK
### Product Requirements Document

## 1. Core Problem

Local Pakistani home-tutor agencies have a documented pattern of fraud: agencies collect fees from parents but fail to pay tutors, and there is no standard background verification of tutors before they are placed with students. Reviewed complaints against agencies such as Zahid Home Tuition and Islamabad Home Tuition Providers confirm this is a real, recurring pattern — not a hypothetical problem.

No current Pakistani platform solves this. Existing "edtech" players (Maqsad, Edkasa, Nearpeer, Out-Class) are video-lecture and test-prep content platforms, not live, verified, 1-on-1 tutor marketplaces. Global marketplaces on a comparable model exist and work: Preply is valued at $1.2 billion.

## 2. Solution

TutorTrust PK is a verified home-tutor marketplace with escrow-protected payments. Parents' payments are held securely and released to the tutor only after a session is confirmed complete. Tutors are background-verified (CNIC + degree) before their profile becomes bookable.

## 3. Target Audience

Grade 9-12 students in Pakistan (Matric, FSc, O-Level, A-Level) — the segment with the highest private-tuition demand (62% of secondary students in Lahore, 54% in Faisalabad take private tuition).

## 4. Team & Timeline

- **Moutter Rasool** — Team Lead & Developer, builds via Google Antigravity
- **Mudassar Jutt** — SEO & Content Writing
- **Muzaffar Abbas** — Testing (checks the live Vercel deployment after each phase)
- **Timeline:** September 1 – September 11, 2026 (11 build days), presentation on September 12 — see ImplementationPlan.md for the corrected day-by-day schedule
- **Course context:** Sair Foundation for the Blind, group "App Titans"; this package is submitted to the course's Project Leaders / instructors

## 5. MVP Scope (14-Day Build)

**In scope:**
- Signup/login with phone OTP verification; two roles (Parent/Student, Tutor)
- Tutor discovery: search + filters (Subject, City, Verified-only)
- Tutor profile pages
- Booking flow with an escrow-status stepper (Payment Held → Session Scheduled → Session Confirmed → Tutor Paid)
- Payment: **simulated** for the September 12 demo (not live JazzCash/EasyPaisa) — see Section 7
- In-app video calling (VideoSDK.live) with screen share as a **core** control, not optional
- Connectivity resilience: audio-only fallback, connection-quality messaging, rejoin-call action (see TRD.md Section 6 — this is specifically required for Pakistani network conditions)
- In-app chat with automatic contact-info detection
- Tutor verification: document upload (images only) + manual admin approval
- Child-safety-by-design: only the parent's CNIC is collected; the child's own ID is never requested
- Parent Dashboard and Tutor Dashboard
- Core accessibility: screen-reader labels, full keyboard navigation, ARIA live-region announcements for escrow and call events

**Explicitly OUT of scope for this 11-day build:**
- **Admin Dashboard** — deferred by team decision. For the demo, administrator actions (tutor approval, dispute review) are performed directly via the Firebase Console rather than a dedicated `/admin` interface. This is a known, deliberate simplification, not an oversight — building a dedicated admin UI is the first candidate for the post-demo roadmap.
- Live JazzCash/EasyPaisa payment integration (payment is simulated; live integration is the immediate next step after the presentation)
- Automated tutor background-check (manual admin review only)
- Dark mode
- Real-time push notifications beyond the in-app dropdown
- Multi-factor authentication (recommended for a later phase, not required now)

## 6. Success Criteria (September 12 Demo)

A parent can sign up, find a verified tutor, book a session (seeing the escrow-protection flow clearly, even with simulated payment), join a video call (with screen share), and confirm session completion — with the whole flow operable via screen reader.

## 7. Monetization (Post-Demo)

Commission-based: a percentage of each booking is retained by the platform when payment is released from escrow. Not implemented functionally during the 11-day build (payment is simulated), but the escrow ledger's data model already supports it (see Schema.md).

## 8. Known, Accepted Limitations (Documented, Not Hidden)

- Chat contact-detection cannot catch phone numbers shared as an image, spelled out in words, or spoken verbally on a video call. This is industry-standard: established tutoring platforms (Tutor.com, Skooli) rely on session recording rather than perfect real-time blocking. TutorTrust PK's Terms of Service explicitly ban circumvention attempts, giving a clear enforcement basis.
- Without a dedicated Admin Dashboard in this build, verification and dispute actions depend on direct Firebase Console access — acceptable for a 3-person course-project demo, not for production scale.
- Pakistan's PS&EFT Act technically requires a PSO/PSP license for platforms handling payment settlement; no current Pakistani online marketplace complies with this, and it is not a blocker for a course demo using simulated payments. A live commercial launch would need to route payments through an already-licensed gateway (e.g. PayFast) rather than self-implementing custody of funds.
