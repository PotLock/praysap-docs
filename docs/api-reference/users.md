# Users API

The Users API handles user profiles, authentication, verification, and preferences within the PRAYSAP platform.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/upsert` | Create or update user profile |
| GET | `/api/users/{userId}` | Get user profile |
| DELETE | `/api/users/{userId}` | Delete user profile |
| POST | `/api/users/{userId}/verify-shahada` | Verify Shahada declaration |
| PATCH | `/api/users/{userId}/privacy` | Update privacy settings |
| GET | `/api/users/{userId}/waitlist` | Check waitlist status |
| POST | `/api/users/{userId}/waitlist/add` | Add user to waitlist |
| GET | `/api/users/{userId}/prayers/joined` | List joined prayers |
| GET | `/api/users/{userId}/prayers/hosted` | List hosted prayers |
| GET | `/api/users/{userId}/notifications` | Get notification preferences |
| PUT | `/api/users/{userId}/notifications` | Update notification preferences |
| GET | `/api/users/{userId}/profile-status` | Get profile completion status |

---

## Create or Update User Profile

Create a new user profile or update an existing one.

**Endpoint:** `POST /api/users/upsert`

**Authentication:** Required

### Request Body

```json path=null start=null
{
  "userId": "user123@example.com",
  "fullname": "Ahmed Ibrahim",
  "email": "user123@example.com",
  "phonenumber": "+1234567890",
  "bio": "Software developer and practicing Muslim",
  "image": "https://example.com/profile.jpg",
  "languages": ["English", "Arabic"],
  "gender": "male",
  "location": {
    "type": "Point",
    "coordinates": [77.5946, 12.9716],
    "address": "Bangalore, India"
  }
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | string | Yes | Unique user identifier |
| `fullname` | string | Yes | Full name of the user |
| `email` | string | Yes | Valid email address |
| `phonenumber` | string | No | Phone number with country code |
| `bio` | string | No | User biography (max 500 characters) |
| `image` | string | No | Profile image URL |
| `languages` | array | No | Array of supported languages |
| `gender` | string | No | Gender: "male", "female", "other" |
| `location` | object | No | GeoJSON Point with address |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "userId": "user123@example.com",
  "fullname": "Ahmed Ibrahim",
  "email": "user123@example.com", 
  "phonenumber": "+1234567890",
  "bio": "Software developer and practicing Muslim",
  "image": "https://example.com/profile.jpg",
  "languages": ["English", "Arabic"],
  "location": {
    "current": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    },
    "address": "Bangalore, India",
    "lastUpdated": "2025-09-14T22:42:05.778Z",
    "accuracy": 10
  },
  "verified": false,
  "privacy": {
    "showEmail": false,
    "showLocation": false,
    "showStats": true,
    "allowMessages": true,
    "profileVisibility": "public"
  },
  "createdAt": "2025-09-14T22:42:05.778Z",
  "updatedAt": "2025-09-14T22:42:05.778Z"
}
```

**Status:** `400 Bad Request`

```json path=null start=null
{
  "error": {
    "message": "Invalid input data",
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Invalid email format",
      "fullname": "Name is required"
    }
  }
}
```

---

## Get User Profile

Retrieve a user profile by userId.

**Endpoint:** `GET /api/users/{userId}`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "userId": "user123@example.com",
  "fullname": "Ahmed Ibrahim",
  "email": "user123@example.com",
  "phonenumber": "+1234567890",
  "bio": "Software developer and practicing Muslim",
  "image": "https://example.com/profile.jpg",
  "languages": ["English", "Arabic"],
  "location": {
    "current": {
      "type": "Point", 
      "coordinates": [77.5946, 12.9716]
    },
    "address": "Bangalore, India",
    "lastUpdated": "2025-09-14T22:42:05.779Z",
    "accuracy": 10
  },
  "verified": true,
  "shahadaDate": "2025-09-10T10:30:00.000Z",
  "privacy": {
    "showEmail": false,
    "showLocation": true,
    "showStats": true,
    "allowMessages": true,
    "profileVisibility": "public"
  },
  "stats": {
    "prayersHosted": 15,
    "prayersAttended": 42,
    "communityRating": 4.8
  },
  "badges": ["Verified", "Regular Host", "Community Helper"],
  "createdAt": "2025-08-14T22:42:05.779Z",
  "updatedAt": "2025-09-14T22:42:05.779Z"
}
```

**Status:** `404 Not Found`

```json path=null start=null
{
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND"
  }
}
```

---

## Delete User Profile

Permanently delete a user profile and all associated data.

**Endpoint:** `DELETE /api/users/{userId}`

**Authentication:** Required (User must be the profile owner or admin)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "User profile deleted successfully",
  "deletedAt": "2025-09-14T22:42:05.780Z"
}
```

**Status:** `404 Not Found`

```json path=null start=null
{
  "error": {
    "message": "User not found",
    "code": "USER_NOT_FOUND"
  }
}
```

---

## Verify Shahada

Verify a user's Shahada declaration for community access.

**Endpoint:** `POST /api/users/{userId}/verify-shahada`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Request Body

```json path=null start=null
{
  "text": "I bear witness that there is no God but Allah, and I bear witness that Muhammad is the Messenger of Allah."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | string | Yes | Shahada text in English or Arabic |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Shahada verified successfully",
  "verified": true,
  "shahadaDate": "2025-09-14T22:42:05.780Z",
  "level": "basic"
}
```

**Status:** `400 Bad Request`

```json path=null start=null
{
  "error": {
    "message": "Shahada text does not match required format",
    "code": "SHAHADA_MISMATCH",
    "details": {
      "expectedFormat": "I bear witness that there is no God but Allah, and I bear witness that Muhammad is the Messenger of Allah."
    }
  }
}
```

---

## Update Privacy Settings

Update user privacy and visibility preferences.

**Endpoint:** `PATCH /api/users/{userId}/privacy`

**Authentication:** Required (User must be profile owner)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Request Body

```json path=null start=null
{
  "privacy": {
    "showEmail": false,
    "showLocation": true,
    "showStats": true,
    "allowMessages": true,
    "profileVisibility": "public"
  }
}
```

### Privacy Options

| Setting | Type | Description |
|---------|------|-------------|
| `showEmail` | boolean | Display email in profile |
| `showLocation` | boolean | Show location information |
| `showStats` | boolean | Display prayer statistics |
| `allowMessages` | boolean | Allow direct messages |
| `profileVisibility` | string | "public", "friends", "private" |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Privacy settings updated",
  "privacy": {
    "showEmail": false,
    "showLocation": true,
    "showStats": true,
    "allowMessages": true,
    "profileVisibility": "public"
  },
  "updatedAt": "2025-09-14T22:42:05.781Z"
}
```

---

## Check Waitlist Status

Check if a user is on the platform waitlist.

**Endpoint:** `GET /api/users/{userId}/waitlist`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "onWaitlist": true,
  "waitlistAt": "2025-09-14T22:42:05.782Z",
  "position": 127,
  "estimatedWaitTime": "2-3 weeks"
}
```

---

## List Joined Prayers

Get prayers that the user has joined as an attendee.

**Endpoint:** `GET /api/users/{userId}/prayers/joined`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Results per page |
| `sort` | string | "dateDesc" | Sort: "dateAsc", "dateDesc", "newest", "oldest" |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "items": [
    {
      "id": "prayer123",
      "type": "Fajr",
      "date": "2025-07-01T04:30:00.000Z",
      "time": "04:30",
      "location": {
        "address": "123 Main St, Bangalore",
        "geo": {
          "type": "Point",
          "coordinates": [77.5946, 12.9716]
        }
      },
      "host": {
        "userId": "host123",
        "name": "Host Name",
        "verified": true
      },
      "status": "attended",
      "joinedAt": "2025-06-30T20:00:00.000Z",
      "checkedInAt": "2025-07-01T04:25:00.000Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20,
  "hasNextPage": true
}
```

---

## List Hosted Prayers

Get prayers that the user is hosting.

**Endpoint:** `GET /api/users/{userId}/prayers/hosted`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Results per page |
| `sort` | string | "dateDesc" | Sort: "dateAsc", "dateDesc", "newest", "oldest" |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "items": [
    {
      "id": "prayer456", 
      "type": "Maghrib",
      "date": "2025-07-02T19:15:00.000Z",
      "time": "19:15",
      "location": {
        "address": "My Home, Bangalore",
        "geo": {
          "type": "Point",
          "coordinates": [77.5946, 12.9716]
        }
      },
      "attendees": [
        {
          "userId": "user789",
          "name": "Attendee Name",
          "status": "confirmed"
        }
      ],
      "capacity": 8,
      "attendeesCount": 5,
      "status": "scheduled",
      "createdAt": "2025-07-01T10:00:00.000Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 20,
  "hasNextPage": false
}
```

---

## Get Notification Preferences

Retrieve user's notification settings and preferences.

**Endpoint:** `GET /api/users/{userId}/notifications`

**Authentication:** Required (User must be profile owner)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "prayerReminders": true,
  "statusUpdates": true,
  "resourceUpdates": false,
  "social": true,
  "safety": true,
  "marketing": false,
  "badges": true,
  "types": ["push", "email", "sms"],
  "reminderMinutes": 15,
  "pushEnabled": true,
  "emailEnabled": true,
  "smsEnabled": false,
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "06:00"
  }
}
```

---

## Update Notification Preferences

Update user's notification settings and preferences.

**Endpoint:** `PUT /api/users/{userId}/notifications`

**Authentication:** Required (User must be profile owner)

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Request Body

```json path=null start=null
{
  "prayerReminders": true,
  "statusUpdates": true,
  "resourceUpdates": false,
  "social": false,
  "safety": true,
  "marketing": false,
  "badges": true,
  "types": ["push", "email"],
  "reminderMinutes": 10,
  "pushEnabled": true,
  "emailEnabled": true
}
```

### Notification Types

| Setting | Description |
|---------|-------------|
| `prayerReminders` | Notifications before prayer times |
| `statusUpdates` | Prayer status changes and updates |
| `resourceUpdates` | Changes to prayer resources |
| `social` | Comments, messages, and social interactions |
| `safety` | Safety alerts and emergency notifications |
| `marketing` | Promotional and marketing content |
| `badges` | Achievement and badge notifications |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Notification preferences updated",
  "preferences": {
    "prayerReminders": true,
    "statusUpdates": true,
    "resourceUpdates": false,
    "social": false,
    "safety": true,
    "marketing": false,
    "badges": true,
    "types": ["push", "email"],
    "reminderMinutes": 10,
    "pushEnabled": true,
    "emailEnabled": true
  },
  "updatedAt": "2025-09-14T22:42:05.783Z"
}
```

---

## Get Profile Status

Get user profile completion and verification status.

**Endpoint:** `GET /api/users/{userId}/profile-status`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | User ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "verified": true,
  "onWaitlist": false,
  "hasLocation": true,
  "hasProfile": true,
  "profileCompletion": 85,
  "missingFields": ["bio"],
  "verificationLevel": "basic",
  "canHostPrayers": true,
  "canJoinPrayers": true
}
```

### Status Fields

| Field | Type | Description |
|-------|------|-------------|
| `verified` | boolean | Shahada verification status |
| `onWaitlist` | boolean | Whether user is on waitlist |
| `hasLocation` | boolean | Location information provided |
| `hasProfile` | boolean | Basic profile completed |
| `profileCompletion` | number | Profile completion percentage |
| `missingFields` | array | List of incomplete profile fields |
| `verificationLevel` | string | Verification level: "basic", "verified", "trusted" |
| `canHostPrayers` | boolean | Permission to host prayers |
| `canJoinPrayers` | boolean | Permission to join prayers |

---

## User Verification Levels

| Level | Requirements | Permissions |
|-------|--------------|-------------|
| **Unverified** | Account created | Limited prayer discovery |
| **Basic** | Shahada verified | Join prayers, basic features |
| **Verified** | Admin verification | Host prayers, full features |
| **Trusted** | Community verification | Moderation tools, leadership |

## Profile Privacy Levels

| Level | Visibility |
|-------|------------|
| **Public** | Visible to all users |
| **Friends** | Visible to connected users only |
| **Private** | Visible to user only |
