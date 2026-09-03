# Changelog

All notable changes to TutorTrust PK are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) — the internationally recognized convention for project changelogs. Dates use ISO 8601 (YYYY-MM-DD). Newest entries go at the top, under `[Unreleased]` until a milestone is reached.

**This file must be updated by Antigravity itself, automatically, as work happens** — every notable change (a new page built, a bug fixed, a security rule added) gets an entry the same session it happens, not reconstructed later from memory. See Rules.md for the full autonomy and communication expectations this project requires. This is the project's permanent historical record; `Tracker.md` is the current-status/next-step view — the two serve different purposes and both must be kept current.

## Categories (use only the ones that apply to a given entry)

- **Added** — a new feature or page that didn't exist before
- **Changed** — a modification to something that already existed
- **Fixed** — a bug fix
- **Security** — anything related to security rules, access control, or data protection
- **Deferred** — a decision to explicitly postpone a feature (e.g. Admin Dashboard, live payments)

---

## [Day 3] - 2026-09-03

### Added
- Created shared `Header` and `Footer` components with accessible navigation.
- Built `/signup`, `/login`, `/verify-phone`, `/forgot-password`, and `/reset-password` authentication pages with Firebase integration.
- Added `/find-tutors` page with `TutorCard` component, sidebar filters, and empty state.
- Integrated all pages into `App.tsx` routing.

## [Day 1] - 2026-09-01

### Added
- Initialized React + TypeScript (Vite) project.
- Configured Tailwind CSS with Design.md color palette and fonts.
- Set up Firebase SDK configuration.
- Scaffolded basic App routing structure.

### Deferred
- Admin Dashboard — postponed past the 11-day build; Firebase Console used as the interim tool (see PRD.md Section 5)
- Live JazzCash/EasyPaisa payment integration — payment is simulated for the September 12 demo
- Dark mode, push notifications beyond the in-app dropdown, multi-factor authentication

---

## Example Entry Format (Delete This Section Once Real Entries Begin)

```
## [Day 3] - 2026-09-03

### Added
- Sign Up page with Parent/Student and Tutor role tabs
- Phone OTP verification flow with 60-second resend cooldown

### Security
- Firestore Security Rules restricting each user to their own `users/{uid}` document

### Fixed
- Role was not persisting correctly to Firestore after signup; corrected the write path
```
