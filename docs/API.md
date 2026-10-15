# API Documentation

Base URL (development): `http://localhost:5280`

Interactive Swagger UI is available at `/swagger` when running in the
Development environment.

All request/response bodies are JSON. Enum fields (`productInterestedIn`,
`status`, etc.) are serialized as integers matching the C# enum order — see
[backend/VedanshSoftware.Api/Models/ContactEnquiry.cs](../backend/VedanshSoftware.Api/Models/ContactEnquiry.cs).

## Public Endpoints

### `POST /api/enquiries`

Submit a new enquiry. Rate limited to 5 requests per 10 minutes per IP address.

**Body:**

```json
{
  "fullName": "Jane Doe",
  "mobileNumber": "9876543210",
  "email": "jane@example.com",
  "organizationName": "Sunshine Society",
  "organizationType": "Cooperative Housing Society",
  "city": "Pune",
  "productInterestedIn": 0,
  "preferredContactMethod": 0,
  "message": "Interested in a demo",
  "consentAccepted": true,
  "enquirySource": 1
}
```

- `productInterestedIn`: 0 = Society Management, 1 = Education Management, 2 = Custom Development, 3 = Other
- `preferredContactMethod`: 0 = Phone, 1 = Email, 2 = WhatsApp (optional)
- `enquirySource`: 0 = Website, 1 = ContactPage, 2 = SocietyPage, 3 = EducationPage, 4 = HomePage, 5 = Other
- `consentAccepted` must be `true` or the request is rejected.
- `mobileNumber` must be a valid Indian mobile (10 digits, optional +91) or a
  valid international number with a `+` country code.

**Response `200`:**

```json
{
  "enquiryReferenceNumber": "VSS-20261015-AKSP",
  "submittedAt": "2026-10-15T07:13:39.71Z",
  "fullName": "Jane Doe",
  "productInterestedIn": 0
}
```

**Response `400`:** validation errors in the standard ASP.NET Core
`ValidationProblemDetails` shape (`errors: { fieldName: [messages] }`).

**Response `429`:** rate limit exceeded.

Submitting the same mobile number + product within 2 minutes returns the
existing enquiry's confirmation instead of creating a duplicate record.

### `GET /api/enquiries/confirmation/{referenceNumber}`

Look up a public confirmation by reference number. Returns only non-sensitive
summary fields (name, product, submission date) — never mobile/email/message.

## Admin Endpoints (require `Authorization: Bearer <token>`)

### `POST /api/auth/login`

```json
{ "email": "admin@example.com", "password": "..." }
```

Returns `{ token, expiresAt, email, displayName, roles }`. Rate limited to
10 attempts per 15 minutes per IP. Account lockout after 5 failed attempts
(15 minutes) is enforced by ASP.NET Identity independent of the rate limiter.

### `GET /api/auth/me`

Returns the current authenticated user's email and roles.

### `GET /api/enquiries`

Search/paginate enquiries. Query params: `search`, `product`, `status`,
`city`, `fromDate`, `toDate`, `page` (default 1), `pageSize` (default 20, max 100).

### `GET /api/enquiries/{id}`

Full enquiry detail including notes.

### `PATCH /api/enquiries/{id}/status`

```json
{ "status": 1, "assignedTo": "sales-team@example.com" }
```

### `POST /api/enquiries/{id}/notes`

```json
{ "note": "Called customer, scheduling demo for Friday." }
```

### `GET /api/admin/dashboard-summary`

Returns total/new counts, breakdowns by product and status, and the 10 most
recent enquiries.

### `GET /api/admin/enquiries/export`

CSV export of all enquiries. Requires the `Admin` role specifically (not `Staff`).

## Health Check

`GET /api/health` — unauthenticated, returns `{ status, timestampUtc }`. Use
this for uptime monitoring (see [DEPLOYMENT.md](DEPLOYMENT.md)).
