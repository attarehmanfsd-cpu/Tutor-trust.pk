# Design.md — TutorTrust PK
### Design System

## 1. Color Palette (Research-Backed, Not Aesthetic Preference)

A 2026 Kantar Worldpanel study of 7,400 households found brands using navy/teal as a primary color retain loyal customers at a rate 33% higher than warm-primary-tone brands, and are independently rated "more honest about pricing." Deep teal specifically combines blue's trustworthiness with green's growth association, and is documented as feeling less intimidating than typical financial-brand blues. Red is deliberately avoided — it measurably reduces conversions in banking/payment contexts due to its risk association.

| Token | Hex | Use |
|---|---|---|
| `primary` (Trust Anchor) | `#1B4B43` deep teal | Primary buttons, headers, completed escrow-stepper states |
| `primary-hover` | `#153A34` | Button hover |
| `accent` (Personality Layer) | `#D98C3F` warm ochre | Used **generously**, not sparingly — micro-interactions, celebratory states (e.g. a subtle animation when an escrow step completes or a "Verified" badge first appears), bento-grid dashboard highlights |
| `background` | `#FFFFFF` | Page background |
| `surface` | `#F7F7F8` | Cards, panels |
| `text-primary` | `#16181B` | Body text |
| `text-secondary` | `#5B6167` | Muted text, timestamps |
| `border` | `#E4E4E7` | Card borders, dividers |
| `success` | `#2C7A4B` | "Done" / "Released" status |
| `warning` | `#B4581F` | Low-balance / caution states |
| `error` | `#B3261E` | Failed states, destructive actions (e.g. Delete Account) |

**Structure rationale:** keep the trust-anchor color (teal) conservative and industry-appropriate; let the accent (ochre) carry the memorable, "not generic" personality work — this follows current design literature's recommended pattern rather than either extreme (all-flat-and-forgettable, or over-decorated-and-untrustworthy).

**Dark mode:** explicitly deferred to the post-MVP roadmap; not required for the 11-day build.

## 2. Typography

- UI font (Latin script): Inter — legible at small sizes for dashboards
- Urdu/Nastaliq content (if/when shown): Noto Nastaliq Urdu
- Headings: 600 weight; Body: 400 weight
- Minimum 16px for any content the user reads closely (form labels, chat text)

## 3. Layout Pattern

- Dashboards use a **bento-grid** layout (asymmetric card sizes) — the dominant 2026 SaaS dashboard pattern: one large card (session list), one medium card (escrow/balance summary), one small card (quick action). Stacks to a single column on mobile.
- Standard 4px spacing unit; 8px/16px/24px/40px for tight/default/section/page-break gaps.
- Cards: `surface` background, 1px `border`, 12px rounded corners, no default drop shadow (flat, content-first — shadow only on hover).
- No gradients, no decorative color stripes.
- Subtle glassmorphism (backdrop-blur + translucent fill) is acceptable only on floating elements (modals, the upload-dropzone overlay) — never on primary content or body text backgrounds, and always contrast-checked.

## 4. Header (Top Navigation) — Consistent on Every Page

```
Logged-out:      [Logo]   [Browse Tutors]  [How It Works]      [Log In] [Sign Up]
Logged-in Parent:[Logo]   [Browse Tutors]  [How It Works]      [Bell] [Messages] [Profile ▾]
Logged-in Tutor: [Logo]   [My Sessions]                        [Bell] [Messages] [Profile ▾]
```

- **Profile/Avatar is always the rightmost element** — this is a near-universal convention (Gmail, Facebook, Amazon); placing it elsewhere (e.g. beside the logo) increases first-time-user confusion rather than reducing it. Research shows 37% of visitors abandon a site due to confusing navigation.
- Profile dropdown: Account Settings → Help & Support → *divider* → **Logout** (always last, visually separated to prevent accidental use). Tutor's dropdown additionally includes Verification Center and Payout Settings, before Account Settings.
- Mobile toggle (if used): `aria-haspopup="true"`, `aria-expanded` reflecting state, Enter/Space to toggle, focus moves into the menu on open, Escape closes it and returns focus, 44×44px minimum touch target. On desktop, navigation stays fully visible — no need to collapse only 2–3 links.

## 5. Footer — 4 Columns

| Trust & Safety | Escrow Payments | Cities | Company |
|---|---|---|---|
| Safety Guidelines | How Escrow Works | Lahore | About Us |
| Verified Tutors | Payment Security | Karachi | Contact / Help & Support |
| Child Safety Policy | Refund/Dispute Policy | Islamabad | Terms of Service |
| | | Faisalabad | Privacy Policy |

Closing line: "© 2026 TutorTrust PK. Secure Academic Excellence."
**"How It Works" appears only in the header — never duplicated in the footer.**

## 6. Button Design

Every button pairs an icon with visible text — never icon-only:

```
[ Search Tutors ]   [ Book a Session ]   [ Message Tutor ]
[ Confirm Session ]  [ Dispute/Refund ]   [ Join Call ]
[ Logout ]           [ Notifications ]    [ Screen Share ]
```

Accessible names are dynamic, not generic:
- `aria-label="Book a session with Ali Hassan, Physics tutor"`
- `aria-label="Confirm session with Sara Ahmed as completed"`
- `aria-label="Mute microphone"` / `"Unmute microphone"` (state-based)

## 7. Accessibility Requirements (Non-Negotiable — Core to This Project)

The app generates no voice/audio output of its own; all "listening" comes from the user's own screen reader (TalkBack, VoiceOver, NVDA, JAWS) reading semantic HTML/ARIA.

- Alt text on every image/icon; `<label>` on every form field
- Full keyboard navigation across booking, video-call controls, dispute/review actions
- Visible focus indicator on every focusable element; focus moves to the main heading on route change
- Skip-to-content link
- Minimum WCAG AA contrast ratio of 4.5:1
- `aria-live="polite"` announcements for escrow-status changes and video-call join/leave/mute events
- Form validation errors linked via `aria-describedby`
- No content conveyed by color alone (e.g. "Verified" badge has text, not just a green dot)
- Minimum 44×44px touch targets
- `prefers-reduced-motion` respected
- Loading/error states use `role="status"` / `role="alert"`

**Mandatory real-device testing:** code review is not sufficient. Test on at least TalkBack (Android) and NVDA (Windows, free) after each major accessibility-related feature — not only at the end of development. Verify specifically: escrow-status announcements, notification updates, form-field labeling, and video-call event announcements.
