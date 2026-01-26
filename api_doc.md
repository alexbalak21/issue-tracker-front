# API Documentation

Base URL: `http://localhost:8100`

## Authentication Endpoints

### Register User
Creates a new user account and returns authentication tokens.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "roles": ["USER"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "profileImage": null
    }
  }
}
```

**Errors:**
- `400` - Email already in use or validation error

---

### Login
Authenticates user and returns access & refresh tokens.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER",
      "roles": ["USER"],
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "profileImage": null
    }
  }
}
```

**Errors:**
- `401` - Invalid credentials

---

### Refresh Token
Generates new access and refresh tokens using a valid refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**
- `401` - Invalid or expired refresh token

---

### Logout
Clears user session and invalidates tokens.

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "message": "Logout successful"
}
```

**Errors:**
- `401` - Unauthorized

---

## User Endpoints

### Get Current User
Returns authenticated user information.

**Endpoint:** `GET /api/user`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "roles": ["USER"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "profileImage": "data:image/..."
}
```

**Errors:**
- `401` - Unauthorized (missing or invalid token)

---

### Update User Profile
Updates user name and email.

**Endpoint:** `PUT /api/user`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "roles": ["USER"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "profileImage": "data:image/..."
}
```

**Errors:**
- `400` - Validation error or email already in use
- `401` - Unauthorized

---

### Upload Profile Image
Uploads a profile picture for the user.

**Endpoint:** `POST /api/user/profile-image`

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: multipart/form-data
```

**Request Body:**
```
file: (binary image file)
```

**Response:** `200 OK`
```json
{
  "message": "Profile image updated successfully",
  "data": {
    "imageData": "data:image/..."
  }
}
```

**Errors:**
- `400` - Invalid file format or size
- `401` - Unauthorized

---

### Update User Password
Changes the user's password.

**Endpoint:** `POST /api/user/password`

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "current_password": "password123",
  "new_password": "newpassword123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password updated successfully"
}
```

**Errors:**
- `400` - Current password is incorrect or validation error
- `401` - Unauthorized

---

## Response Format

All API responses follow this structure:

```json
{
  "message": "Description of the result",
  "data": {}  // Optional, contains response data
}
```

## Token Information

- **Access Token:** Short-lived token for API requests (configured expiration)
- **Refresh Token:** Long-lived token to obtain new access tokens
- Access tokens must be included in the `Authorization` header as `Bearer {token}`
