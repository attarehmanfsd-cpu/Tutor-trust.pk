# Schema.md — TutorTrust PK
### Database Schema (Firebase Firestore)

## Collection: `users`
One document per authenticated account (both parents and tutors).

| Field | Type | Notes |
|---|---|---|
| `uid` | string (doc ID) | Matches Firebase Auth UID |
| `role` | string | `"parent"` or `"tutor"` — **never client-writable after creation**; only a Cloud Function may change it |
| `fullName` | string | |
| `email` | string | |
| `phoneNumber` | string | |
| `phoneVerified` | boolean | Default `false`; gates dashboard access |
| `createdAt` | timestamp | |

**Security Rule:** a user may read/update their own document, but never the `role` or `verified` fields directly.

## Collection: `students` (nested under parent)
Path: `users/{parentId}/students/{studentId}`

| Field | Type | Notes |
|---|---|---|
| `name` | string | Declared by the parent |
| `age` | number | Declared by the parent |
| `grade` | string | e.g. "Matric", "O-Level", "A-Level", "FSc" |

**Child-safety principle:** no independent identity document or verification exists for a student record — it is a statement made by the verified parent, not a separately verified identity. This is deliberate, not an oversight (see PRD.md).

## Collection: `tutor_profiles`
Path: `tutor_profiles/{uid}` (same ID as the `users` document for that tutor)

| Field | Type | Notes |
|---|---|---|
| `qualification` | string | |
| `subjects` | array of strings | e.g. `["Physics", "O-Level Math"]` |
| `city` | string | |
| `hourlyRate` | number | |
| `experienceYears` | number | |
| `rating` | number | Computed average from `reviews` |
| `reviewCount` | number | |
| `verified` | boolean | Default `false`; **only a Cloud Function may set this true**, after admin review |
| `verificationStatus` | string | `"pending"`, `"verified"`, `"rejected"` |

**Security Rule:** public read access for `verified: true` profiles (needed for Find Tutors search); write access restricted to the owning tutor for non-sensitive fields, and to Cloud Functions only for `verified`/`verificationStatus`.

## Collection: `verification_documents`
Path: `tutor_profiles/{uid}/verification_documents/{docId}`

| Field | Type | Notes |
|---|---|---|
| `type` | string | `"cnic_front"`, `"cnic_back"`, `"degree"` |
| `storagePath` | string | Path in Firebase Storage (private bucket) |
| `uploadedAt` | timestamp | |

**Security Rule:** readable only by the owning tutor and by an admin context (Cloud Function); never publicly readable.

## Collection: `bookings`

| Field | Type | Notes |
|---|---|---|
| `id` | string (doc ID) | |
| `parentId` | string | |
| `studentId` | string | Reference to the nested student record |
| `tutorId` | string | |
| `subject` | string | |
| `scheduledAt` | timestamp | **Current confirmed time** — updated on reschedule; the no-show check always reads this field, never an "original" time |
| `durationMinutes` | number | |
| `status` | string | `"scheduled"`, `"in_progress"`, `"completed"`, `"cancelled"`, `"no_show"`, `"disputed"` |
| `videoRoomId` | string | VideoSDK.live room reference |
| `createdAt` | timestamp | |

**Security Rule:** a parent may only read/write bookings where `parentId == auth.uid()`; a tutor may only read/write bookings where `tutorId == auth.uid()`.

## Collection: `escrow_transactions`
Path: `bookings/{bookingId}/escrow_transactions/{txId}` (or a top-level collection with a `bookingId` field — either is acceptable, but keep it consistent)

| Field | Type | Notes |
|---|---|---|
| `bookingId` | string | |
| `amount` | number | Simulated for the 11-day build; real currency amount once live payments are added |
| `status` | string | `"held"`, `"released"`, `"refunded"`, `"disputed"` |
| `paymentMethodSimulated` | string | `"card"`, `"jazzcash"`, `"easypaisa"` — labeled clearly as simulated during this build |
| `heldAt` | timestamp | |
| `releasedAt` | timestamp \| null | |

**Security Rule:** writable only by Cloud Functions — never directly by a client. This is the single most important rule in the schema: it is what prevents a user from marking their own payment as released.

## Collection: `reviews`
Path: `tutor_profiles/{tutorId}/reviews/{reviewId}`

| Field | Type | Notes |
|---|---|---|
| `bookingId` | string | |
| `parentId` | string | |
| `rating` | number | 1–5 |
| `comment` | string | Optional |
| `createdAt` | timestamp | |

## Collection: `disputes`
Path: `bookings/{bookingId}/disputes/{disputeId}`

| Field | Type | Notes |
|---|---|---|
| `reason` | string | `"tutor_no_show"`, `"quality_concern"`, `"other"` |
| `detail` | string | |
| `evidenceStoragePath` | string \| null | Optional uploaded evidence |
| `status` | string | `"open"`, `"resolved_released"`, `"resolved_refunded"` |
| `createdAt` | timestamp | |

## Collection: `messages`
Path: `conversations/{conversationId}/messages/{messageId}`

| Field | Type | Notes |
|---|---|---|
| `senderId` | string | |
| `text` | string | Scanned by `scanChatMessage` Cloud Function before write completes |
| `flagged` | boolean | True if contact-info pattern was detected |
| `createdAt` | timestamp | |

## Collection: `notifications`
Path: `users/{uid}/notifications/{notificationId}`

| Field | Type | Notes |
|---|---|---|
| `type` | string | `"payment_released"`, `"verification_approved"`, `"new_message"`, etc. |
| `text` | string | |
| `read` | boolean | Must not be the *only* way unread state is conveyed — pair with an accessible count, not a color dot alone |
| `createdAt` | timestamp | |

## Indexes

- `bookings`: composite index on `(parentId, scheduledAt)` and `(tutorId, scheduledAt)` for dashboard queries
- `tutor_profiles`: composite index on `(verified, city, subjects)` for Find Tutors filtering
- `notifications`: index on `(read, createdAt)` per user

## Admin Access (Note — No Dedicated Admin UI in This Build)

Verification approval and dispute resolution are performed via direct Firebase Console access during the 11-day build (Admin Dashboard is explicitly deferred — see PRD.md Section 5). When a dedicated `/admin` interface is built post-demo, it should operate through the same Cloud Functions already defined here (setting `verified`, resolving `disputes.status`) rather than granting direct client-side write access to these protected fields.
