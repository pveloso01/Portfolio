# API Endpoints Documentation

This document provides a comprehensive overview of all available API endpoints, their operations, authentication requirements, and additional details.

## Base URL

- **Development**: `http://localhost:8000`
- **Production**: (configured via environment variables)

## Authentication

All authenticated endpoints require a JWT (JSON Web Token) in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

JWT tokens are obtained through the `/api/v1/auth/jwt/create/` endpoint. Access tokens expire after 15 minutes. Refresh tokens expire after 7 days and can be used to obtain new access tokens.

---

## Endpoints

### 1. Health Check

#### `GET /healthz/`

**Description**: Health check endpoint for load balancers and monitoring systems.

**Authentication**: None required

**Operations**:

- `GET`: Check API and database status

**Request**: No body required

**Response** (200 OK):

```json
{
  "status": "ok",
  "db": true
}
```

**Details**:

- Returns `"db": false` if database connection fails
- Useful for Kubernetes liveness/readiness probes
- Does not require authentication

---

### 2. API Documentation

#### `GET /api/schema/`

**Description**: OpenAPI 3.0 schema endpoint for API documentation.

**Authentication**: None required

**Operations**:

- `GET`: Retrieve OpenAPI schema

**Response**: OpenAPI 3.0 JSON schema

---

#### `GET /api/docs/` (Debug only)

**Description**: Swagger UI for interactive API documentation.

**Authentication**: None required

**Operations**:

- `GET`: Access Swagger UI interface

**Details**:

- Only available when `DEBUG=True`
- Provides interactive API exploration

---

### 3. JWT Authentication Endpoints

All JWT endpoints are provided by Djoser and use `rest_framework_simplejwt`.

#### `POST /api/v1/auth/jwt/create/`

**Description**: Create JWT access and refresh tokens (login).

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Obtain JWT tokens

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "<your_password>"
}
```

**Response** (200 OK):

```json
{
  "access": "<access_token>",
  "refresh": "<refresh_token>"
}
```

**Details**:

- Uses email as the login field (configured in `DJOSER["LOGIN_FIELD"]`)
- Access token lifetime: 15 minutes
- Refresh token lifetime: 7 days
- Returns tokens only if user account is active

**Error Responses**:

- `400 Bad Request`: Invalid credentials
- `401 Unauthorized`: Invalid email or password

---

#### `POST /api/v1/auth/jwt/refresh/`

**Description**: Obtain a new access token using a refresh token.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Refresh access token

**Request Body**:

```json
{
  "refresh": "<refresh_token>"
}
```

**Response** (200 OK):

```json
{
  "access": "<access_token>"
}
```

**Details**:

- Token rotation enabled: a new refresh token is issued when refreshing
- Old refresh token is blacklisted after rotation (`BLACKLIST_AFTER_ROTATION=True`)
- Returns only the new access token (refresh token should be stored from the response)

**Error Responses**:

- `400 Bad Request`: Invalid or expired refresh token
- `401 Unauthorized`: Refresh token has been blacklisted

---

#### `POST /api/v1/auth/jwt/verify/`

**Description**: Verify if a JWT access token is valid.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Verify token validity

**Request Body**:

```json
{
  "token": "<jwt_token>"
}
```

**Response** (200 OK):

```json
{}
```

**Details**:

- Returns empty object if token is valid
- Useful for client-side token validation

**Error Responses**:

- `400 Bad Request`: Invalid token format
- `401 Unauthorized`: Token is expired or invalid

---

#### `POST /api/v1/auth/logout/`

**Description**: Blacklist a refresh token (logout).

**Authentication**: **Required** (Bearer token)

**Operations**:

- `POST`: Blacklist refresh token

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Request Body**:

```json
{
  "refresh": "<refresh_token>"
}
```

**Response** (205 Reset Content): Empty body

**Details**:

- Blacklists the provided refresh token
- Returns 205 Reset Content to indicate client should clear local auth state
- After blacklisting, the refresh token cannot be used to obtain new access tokens
- Custom endpoint (not provided by Djoser)

**Error Responses**:

- `400 Bad Request`: Missing or invalid refresh token
- `401 Unauthorized`: Authentication required

---

### 4. User Management Endpoints

All user endpoints are provided by Djoser and follow REST conventions.

#### `POST /api/v1/auth/users/`

**Description**: Register a new user account.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Create new user

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "<your_password>",
  "re_password": "<your_password>"
}
```

**Response** (201 Created):

```json
{
  "id": 1,
  "email": "user@example.com"
}
```

**Details**:

- `re_password` is required (configured via `USER_CREATE_PASSWORD_RETYPE=True`)
- User is created but `is_active=False` until activation
- Activation email is sent automatically (`SEND_ACTIVATION_EMAIL=True`)
- Email confirmation is also sent (`SEND_CONFIRMATION_EMAIL=True`)
- Permission: `AllowAny` (anyone can register)

**Error Responses**:

- `400 Bad Request`: Validation errors (email already exists, passwords don't match, etc.)

---

#### `GET /api/v1/auth/users/`

**Description**: List users (restricted).

**Authentication**: **Required** (Bearer token)

**Operations**:

- `GET`: List users

**Response**: Varies based on permissions

**Details**:

- Permission: `CurrentUserOrAdmin` (users can only see themselves, admins see all)
- User enumeration protection enabled (`HIDE_USERS=True`)

---

#### `GET /api/v1/auth/users/{id}/`

**Description**: Retrieve a specific user by ID.

**Authentication**: **Required** (Bearer token)

**Operations**:

- `GET`: Get user details

**Response** (200 OK):

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "",
  "last_name": ""
}
```

**Details**:

- Permission: `CurrentUserOrAdmin` (users can only access their own profile)
- Returns user fields: `id`, `email`, `first_name`, `last_name`

**Error Responses**:

- `403 Forbidden`: Not authorized to access this user
- `404 Not Found`: User does not exist

---

#### `GET /api/v1/auth/users/me/`

**Description**: Get current authenticated user's profile.

**Authentication**: **Required** (Bearer token)

**Operations**:

- `GET`: Get current user profile
- `PUT`: Update current user profile
- `PATCH`: Partially update current user profile
- `DELETE`: Delete current user account

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**GET Response** (200 OK):

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "",
  "last_name": ""
}
```

**PUT/PATCH Request Body**:

```json
{
  "first_name": "John",
  "last_name": "Doe"
}
```

**PUT/PATCH Response** (200 OK):

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

**DELETE Response** (204 No Content): Empty body

**Details**:

- `email` and `id` are read-only fields (cannot be changed via this endpoint)
- Use separate endpoints for email changes (see below)
- Permission: `IsAuthenticated` (user must be logged in)

**Error Responses**:

- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Authentication required

---

### 5. User Activation Endpoints

#### `POST /api/v1/auth/users/activation/`

**Description**: Activate a user account using uid and token from activation email.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Activate user account

**Request Body**:

```json
{
  "uid": "MQ",
  "token": "<activation_token>"
}
```

**Response** (204 No Content): Empty body

**Details**:

- `uid` and `token` are provided in the activation email
- Activation URL format: `activate/{uid}/{token}` (configured in `ACTIVATION_URL`)
- Frontend should extract `uid` and `token` from the email link and POST them here
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid or expired activation token
- `404 Not Found`: User not found

---

#### `POST /api/v1/auth/users/resend_activation/`

**Description**: Resend activation email to a user.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Resend activation email

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response** (204 No Content): Empty body

**Details**:

- Sends a new activation email to the specified email address
- Does not reveal whether the email exists (anti-enumeration)
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid email format

---

### 6. Password Management Endpoints

#### `POST /api/v1/auth/users/set_password/`

**Description**: Change password for authenticated user.

**Authentication**: **Required** (Bearer token)

**Operations**:

- `POST`: Change password

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Request Body**:

```json
{
  "new_password": "<new_password>",
  "re_new_password": "<new_password>"
}
```

**Response** (204 No Content): Empty body

**Details**:

- `re_new_password` is required (configured via `SET_PASSWORD_RETYPE=True`)
- Password change confirmation email is sent (`PASSWORD_CHANGED_EMAIL_CONFIRMATION=True`)
- **All user tokens are blacklisted** after password change (via `SetPasswordAndBlacklistSerializer`)
- User must re-authenticate after password change
- Permission: `IsAuthenticated` (user must be logged in)

**Error Responses**:

- `400 Bad Request`: Passwords don't match, invalid password format
- `401 Unauthorized`: Authentication required

---

#### `POST /api/v1/auth/users/reset_password/`

**Description**: Request password reset email.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Request password reset

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response** (204 No Content): Empty body

**Details**:

- Sends password reset email with confirmation link
- Does not reveal whether the email exists (`PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND=False`)
- Reset confirmation URL format: `reset-password/{uid}/{token}` (configured in `PASSWORD_RESET_CONFIRM_URL`)
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid email format

---

#### `POST /api/v1/auth/users/reset_password_confirm/`

**Description**: Confirm password reset using uid and token from reset email.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Confirm password reset

**Request Body**:

```json
{
  "uid": "MQ",
  "token": "<reset_token>",
  "new_password": "<new_password>",
  "re_new_password": "<new_password>"
}
```

**Response** (204 No Content): Empty body

**Details**:

- `uid` and `token` are provided in the password reset email
- `re_new_password` is required (`PASSWORD_RESET_CONFIRM_RETYPE=True`)
- Frontend should extract `uid` and `token` from the email link
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid or expired token, passwords don't match
- `404 Not Found`: User not found

---

### 7. Email/Username Management Endpoints

#### `POST /api/v1/auth/users/set_email/`

**Description**: Change email (username) for authenticated user.

**Authentication**: **Required** (Bearer token)

**Operations**:

- `POST`: Change email

**Request Headers**:

```
Authorization: Bearer <access_token>
```

**Request Body**:

```json
{
  "new_email": "newemail@example.com",
  "re_new_email": "newemail@example.com",
  "current_password": "<current_password>"
}
```

**Response** (204 No Content): Empty body

**Details**:

- Email change confirmation email is sent (`USERNAME_CHANGED_EMAIL_CONFIRMATION=True`)
- Requires current password for security
- Permission: `IsAuthenticated` (user must be logged in)

**Error Responses**:

- `400 Bad Request`: Emails don't match, invalid email, wrong current password
- `401 Unauthorized`: Authentication required

---

#### `POST /api/v1/auth/users/reset_email/`

**Description**: Request email reset (change email via email confirmation).

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Request email reset

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Response** (204 No Content): Empty body

**Details**:

- Sends email reset confirmation link
- Reset confirmation URL format: `reset-email/{uid}/{token}` (configured in `USERNAME_RESET_CONFIRM_URL`)
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid email format

---

#### `POST /api/v1/auth/users/reset_email_confirm/`

**Description**: Confirm email reset using uid and token from reset email.

**Authentication**: None required (public endpoint)

**Operations**:

- `POST`: Confirm email reset

**Request Body**:

```json
{
  "uid": "MQ",
  "token": "<reset_token>",
  "new_email": "newemail@example.com",
  "re_new_email": "newemail@example.com"
}
```

**Response** (204 No Content): Empty body

**Details**:

- `uid` and `token` are provided in the email reset confirmation email
- Frontend should extract `uid` and `token` from the email link
- Permission: `AllowAny` (public endpoint)

**Error Responses**:

- `400 Bad Request`: Invalid or expired token, emails don't match
- `404 Not Found`: User not found

---

#### `POST /api/v1/auth/users/reset_username/`

**Description**: Alias for `reset_email` endpoint (legacy support).

**Authentication**: None required (public endpoint)

**Details**:

- Same as `reset_email` endpoint
- Maintained for backwards compatibility

---

#### `POST /api/v1/auth/users/reset_username_confirm/`

**Description**: Alias for `reset_email_confirm` endpoint (legacy support).

**Authentication**: None required (public endpoint)

**Details**:

- Same as `reset_email_confirm` endpoint
- Maintained for backwards compatibility

---

## Summary Table

| Endpoint                                     | Method               | Auth Required | Permission Class   | Description              |
| -------------------------------------------- | -------------------- | ------------- | ------------------ | ------------------------ |
| `/healthz/`                                  | GET                  | No            | None               | Health check             |
| `/api/schema/`                               | GET                  | No            | None               | OpenAPI schema           |
| `/api/docs/`                                 | GET                  | No            | None               | Swagger UI (debug only)  |
| `/api/v1/auth/jwt/create/`                   | POST                 | No            | AllowAny           | Login (get tokens)       |
| `/api/v1/auth/jwt/refresh/`                  | POST                 | No            | AllowAny           | Refresh access token     |
| `/api/v1/auth/jwt/verify/`                   | POST                 | No            | AllowAny           | Verify token             |
| `/api/v1/auth/logout/`                       | POST                 | Yes           | IsAuthenticated    | Logout (blacklist token) |
| `/api/v1/auth/users/`                        | POST                 | No            | AllowAny           | Register new user        |
| `/api/v1/auth/users/`                        | GET                  | Yes           | CurrentUserOrAdmin | List users               |
| `/api/v1/auth/users/{id}/`                   | GET                  | Yes           | CurrentUserOrAdmin | Get user by ID           |
| `/api/v1/auth/users/me/`                     | GET/PUT/PATCH/DELETE | Yes           | IsAuthenticated    | Current user profile     |
| `/api/v1/auth/users/activation/`             | POST                 | No            | AllowAny           | Activate account         |
| `/api/v1/auth/users/resend_activation/`      | POST                 | No            | AllowAny           | Resend activation email  |
| `/api/v1/auth/users/set_password/`           | POST                 | Yes           | IsAuthenticated    | Change password          |
| `/api/v1/auth/users/reset_password/`         | POST                 | No            | AllowAny           | Request password reset   |
| `/api/v1/auth/users/reset_password_confirm/` | POST                 | No            | AllowAny           | Confirm password reset   |
| `/api/v1/auth/users/set_email/`              | POST                 | Yes           | IsAuthenticated    | Change email             |
| `/api/v1/auth/users/reset_email/`            | POST                 | No            | AllowAny           | Request email reset      |
| `/api/v1/auth/users/reset_email_confirm/`    | POST                 | No            | AllowAny           | Confirm email reset      |

---

## Configuration Details

### JWT Settings

- **Access Token Lifetime**: 15 minutes
- **Refresh Token Lifetime**: 7 days
- **Token Rotation**: Enabled (new refresh token issued on refresh)
- **Blacklist After Rotation**: Enabled
- **Auth Header Type**: `Bearer`

### Email Settings

- **Activation Emails**: Enabled (`SEND_ACTIVATION_EMAIL=True`)
- **Confirmation Emails**: Enabled (`SEND_CONFIRMATION_EMAIL=True`)
- **Password Change Emails**: Enabled
- **Email Change Emails**: Enabled
- **Frontend Domain**: Configurable via `FRONTEND_DOMAIN` env var (default: `localhost:3000`)
- **Frontend Protocol**: Configurable via `FRONTEND_PROTOCOL` env var (default: `http`)

### Security Features

- **User Enumeration Protection**: Enabled (`HIDE_USERS=True`)
- **Password Re-type Required**: Enabled for registration, password change, and reset
- **Token Blacklisting**: Enabled on password change and logout
- **Email Not Found Protection**: Disabled for password reset (does not reveal if email exists)

---

## Common Error Responses

### 400 Bad Request

- Validation errors (missing fields, invalid formats, passwords don't match, etc.)
- Request body format issues

### 401 Unauthorized

- Missing or invalid JWT token
- Expired token
- Blacklisted token
- Invalid credentials

### 403 Forbidden

- User does not have permission to access resource
- Trying to access another user's data

### 404 Not Found

- Resource does not exist
- Invalid activation/reset token

### 405 Method Not Allowed

- HTTP method not supported for endpoint

---

## Notes

1. **Email-based Authentication**: This API uses email as the username field. The `username` field is disabled.

2. **Account Activation**: New users must activate their accounts via email before they can log in.

3. **Token Management**: After password changes, all tokens are blacklisted. Users must log in again.

4. **Frontend Integration**: Email confirmation links include `{uid}` and `{token}` placeholders that must be extracted and sent to the appropriate confirmation endpoint.

5. **Debug Mode**: The Swagger UI (`/api/docs/`) is only available when `DEBUG=True`.

6. **CORS**: CORS is configured for the Next.js frontend. Allowed origins are configurable via `CORS_ALLOWED_ORIGINS` environment variable.
