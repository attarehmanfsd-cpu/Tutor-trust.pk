# Rules.md — TutorTrust PK
### Project Rules for AI Coding Agents (Google Antigravity, or any agentic IDE)

This file is tool-agnostic. Any current agentic IDE (Antigravity, Cursor, Windsurf, Claude Code) reads project-level markdown as persistent context. **Keep this file, `Tracker.md`, and `CHANGELOG.md` in the project root** — this trio (rules, current status, historical record) covers what an AI-agent-built project needs; no separate memory system is required at this scale.

## 0. Who Is Building This — Read This Section First

- **The builder directing this project (Moutter Rasool) is blind and works entirely via screen reader.** This is not a minor detail — it governs how Antigravity must communicate, in addition to how the app itself must be built (see Design.md Section 7 for the app's own accessibility requirements — this section is about *how Antigravity talks to the builder*, which is a separate and equally important concern).
- **Team:** Moutter Rasool (Builder/Team Lead, works via screen reader), Mudassar Jutt (SEO & Content — not a developer, does not interact with Antigravity directly), Muzaffar Abbas (Tester — checks the live Vercel deployment as an end user, does not interact with Antigravity directly). Antigravity's technical communication is with Moutter only.
- **Course context:** this is a course project for the Sair Foundation for the Blind, group "App Titans," with an 11-day build window (Sep 1–11, 2026) and a presentation on Sep 12.

## 1. Mandatory Communication Rules for Antigravity

These rules apply to every response Antigravity gives the builder, without exception:

1. **Reply in Roman Urdu** (Urdu written in Latin script), not English and not Urdu script — this is the builder's working language for this project.
2. **Plain text only.** Do not generate diagrams, images, visual mockups, colored terminal art, tables-as-images, or any other visual artifact as a way of explaining something — a screen reader cannot usefully read a diagram. If a structure needs to be conveyed (e.g. a file tree, a flow), describe it in sentences or a simple linear list, not a visual layout.
3. **No walkthroughs that assume sight.** Never say things like "as you can see in the screenshot" or "the button in the top-right corner" — describe things by name and function, not by visual position (this mirrors the same rule already required of the *app's* own content — see Design.md — and applies equally to Antigravity's own explanations).
4. **Every explanation should be a plain-text reply the builder can have read aloud immediately** — no collapsed sections, no "click to expand" content, nothing that requires visually scanning a page to find.

## 2. Autonomy Expectations (Given the Compressed 11-Day Timeline)

- **Maximize what Antigravity handles independently.** Antigravity has integrated terminal and Git support — it should write code, run it, test it, commit it, and push it, rather than instructing the builder to perform steps it can already do itself.
- The builder's role is to **review completed work and give direction for the next step** — not to manually type commands Antigravity is capable of running.
- When a phase from `ImplementationPlan.md` is complete, Antigravity should push to GitHub (triggering the Vercel auto-deploy) without waiting to be separately asked, then report completion in plain text.

## 3. Self-Maintaining Documentation (Required, Not Optional)

- **`Tracker.md` must be updated by Antigravity at the end of every session** — move completed items, update "Next Up," log any new blockers or decisions. Do not leave this for the builder to do manually.
- **`CHANGELOG.md` must be updated by Antigravity the same session a notable change happens** — a new page, a bug fix, a security-rule change all get an entry, following the Keep a Changelog format already set up in that file. Do not batch this up to "do later."
- If Antigravity is ever unsure whether something is "notable enough" for the changelog or is a genuine architectural decision needing a `Tracker.md` entry, default to logging it — a slightly over-documented project is far easier to recover from than an under-documented one on a tight timeline.

## Folder Structure (Reference)

```
/src
  /pages
    Landing.tsx, SignUp.tsx, VerifyPhone.tsx, Login.tsx,
    ForgotPassword.tsx, ResetPassword.tsx, WelcomeTour.tsx,
    FindTutors.tsx, TutorProfile.tsx, SecureBooking.tsx,
    VideoCallSession.tsx, Messages.tsx, AccountSettings.tsx, HelpSupport.tsx
    /dashboard
      ParentDashboard.tsx, ManageSession.tsx, SubmitReview.tsx, DisputeCenter.tsx
    /tutor-dashboard
      TutorDashboard.tsx, VerificationCenter.tsx, PayoutSettings.tsx
  /components
    Navbar.tsx, Footer.tsx, NotificationDropdown.tsx, TutorCard.tsx,
    EscrowStatusStepper.tsx, VideoCallControls.tsx, RoleTabs.tsx,
    RoleGuard.tsx, LoadingState.tsx, ErrorState.tsx, FormInput.tsx
  /firebase
    config.ts, auth.ts, firestore.ts, storage.ts
  /functions   (Firebase Cloud Functions — separate deploy target)
    createEscrowTransaction.ts, releaseEscrowPayment.ts, createVideoRoom.ts,
    scanChatMessage.ts, sendNotification.ts, handleNoShow.ts
  App.tsx, main.tsx
firestore.rules
storage.rules
.env
```

## Hard Rules (Prevent Drift)

1. **Never invent a Firestore collection or field not in `Schema.md`.** If a feature seems to need one, stop and flag it — update `Schema.md` first.
2. **Never use a Firebase service-account/admin key in frontend code.** Privileged operations (setting `verified`, releasing escrow) only happen in Cloud Functions.
3. **Never let a client directly write to `escrow_transactions` or a tutor's `verified` field.** These are Cloud-Function-only writes — the single most important security rule in the entire project.
4. **Never process file uploads through a custom backend.** Files go browser → Firebase Storage directly; the backend only ever receives the storage path.
5. **Every Cloud Function must be idempotent** — a retried function must not double-release escrow funds or create duplicate records.
6. **The no-show check must always use the booking's current confirmed `scheduledAt` time**, not an original/created time — this was an identified bug class, not a style preference (see TRD.md Section 4).
7. **Every chat message goes through `scanChatMessage` before it is persisted.** Do not add a "fast path" that skips this check.
8. **Screen Share is a required video-call control, not optional** — do not silently drop it if the SDK integration proves fiddly; flag it instead.
9. **Every interactive element needs an accessible name** (`aria-label` or visible text) — icon-only buttons are not acceptable anywhere in this app (this is a requirement of the *app itself*, distinct from Rule Section 1's requirement about how Antigravity talks to the builder).
10. **Follow `Design.md` exactly for colors/spacing** — no ad-hoc hex codes invented mid-session.
11. **Read `Tracker.md`'s "Next Up" section before starting any new work in a session**, then update both `Tracker.md` and `CHANGELOG.md` before ending the session (see Section 3 above).
12. **TypeScript:** strict mode, no `any`; React function components with explicit prop types.
13. **No bare `catch {}` blocks** in Cloud Functions — catch specific errors and log them; a silent failure in escrow logic is unacceptable.

## Anti-Patterns to Avoid

- Do not build a dedicated `/admin` interface during this 11-day window — it is explicitly out of scope (see PRD.md). Do not "helpfully" add one anyway.
- Do not implement live JazzCash/EasyPaisa payment calls during this window — payment is simulated by design; flag to the builder if asked to build live payment integration now.
- Do not add dark mode, push notifications beyond the in-app dropdown, or MFA during this build — all are explicitly deferred (see PRD.md).
- Do not assume the video SDK "just works" on a fast connection and skip testing degraded-connection behavior — this is a named, researched risk for this specific market (see TRD.md Section 6).
- Do not collect any identification document from a student (child) — only the parent's CNIC is ever collected, by design (see Schema.md, PRD.md).
- Do not explain anything to the builder in a way that assumes sight (see Section 1) — this applies to every response, not just ones about the UI.
