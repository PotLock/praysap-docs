# Community API

The Community API enables social interactions, messaging, and community features within PRAYSAP.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Comments** |
| POST | `/api/comments` | Create a comment on a prayer |
| GET | `/api/comments/prayer/{prayerId}` | Get comments for a prayer |
| **Messages** |
| POST | `/api/messages` | Send a message in a prayer session |
| GET | `/api/messages/prayer/{prayerId}` | Get messages for a prayer |
| **Reviews** |
| POST | `/reviews` | Create a review for a prayer |
| GET | `/reviews/prayer/{prayerId}` | Get reviews for a prayer |
| **Reports** |
| POST | `/api/reports` | Create a report |
| GET | `/api/reports` | Get reports (admin only) |
| PATCH | `/api/reports/{id}/status` | Update report status (admin) |
| **Safety** |
| POST | `/api/safety/sos` | Send emergency SOS |
| **Sharing** |
| GET | `/api/share/prayer/{id}` | Get shareable prayer link |

---

## Comments

### Create Comment

Add a comment to a prayer session.

**Endpoint:** `POST /api/comments`

**Authentication:** Required

#### Request Body

```json path=null start=null
{
  "prayerId": "prayer123",
  "content": "Looking forward to this prayer session! Jazakallahu khair for hosting.",
  "parentId": null
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prayerId` | string | Yes | ID of the prayer being commented on |
| `content` | string | Yes | Comment text (max 500 characters) |
| `parentId` | string | No | ID of parent comment for replies |

#### Response

**Status:** `201 Created`

```json path=null start=null
{
  "id": "comment123",
  "prayerId": "prayer123", 
  "userId": "user123",
  "author": {
    "name": "Ahmed Ibrahim",
    "image": "https://example.com/avatar.jpg",
    "verified": true
  },
  "content": "Looking forward to this prayer session! Jazakallahu khair for hosting.",
  "parentId": null,
  "replies": [],
  "likes": 0,
  "createdAt": "2025-09-14T22:42:05.784Z",
  "updatedAt": "2025-09-14T22:42:05.784Z"
}
```

### Get Prayer Comments

Retrieve all comments for a specific prayer.

**Endpoint:** `GET /api/comments/prayer/{prayerId}`

**Authentication:** Required

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prayerId` | string | Yes | Prayer ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Comments per page |
| `sort` | string | "newest" | Sort: "newest", "oldest", "popular" |

#### Response

**Status:** `200 OK`

```json path=null start=null
{
  "comments": [
    {
      "id": "comment123",
      "userId": "user123",
      "author": {
        "name": "Ahmed Ibrahim",
        "image": "https://example.com/avatar.jpg",
        "verified": true
      },
      "content": "Looking forward to this prayer session!",
      "parentId": null,
      "replies": [
        {
          "id": "reply456",
          "userId": "host123",
          "author": {
            "name": "Host Name",
            "verified": true
          },
          "content": "Barakallahu feek! See you there.",
          "createdAt": "2025-09-14T22:45:00.000Z"
        }
      ],
      "likes": 3,
      "createdAt": "2025-09-14T22:42:05.784Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 20
}
```

---

## Messages

### Send Message

Send a message in a prayer session chat.

**Endpoint:** `POST /api/messages`

**Authentication:** Required

#### Request Body

```json path=null start=null
{
  "prayerId": "prayer123",
  "content": "Assalamu alaikum everyone! Prayer starts in 10 minutes.",
  "type": "text"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prayerId` | string | Yes | Prayer session ID |
| `content` | string | Yes | Message content |
| `type` | string | No | Message type: "text", "system", "announcement" |

#### Response

**Status:** `201 Created`

```json path=null start=null
{
  "id": "message123",
  "prayerId": "prayer123",
  "userId": "user123",
  "author": {
    "name": "Ahmed Ibrahim",
    "image": "https://example.com/avatar.jpg",
    "verified": true
  },
  "content": "Assalamu alaikum everyone! Prayer starts in 10 minutes.",
  "type": "text",
  "createdAt": "2025-09-14T22:42:05.785Z"
}
```

### Get Prayer Messages

Retrieve messages for a prayer session.

**Endpoint:** `GET /api/messages/prayer/{prayerId}`

**Authentication:** Required

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prayerId` | string | Yes | Prayer ID |

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `before` | string | - | Get messages before this timestamp |
| `limit` | number | 50 | Number of messages to retrieve |

#### Response

**Status:** `200 OK`

```json path=null start=null
{
  "messages": [
    {
      "id": "message123",
      "userId": "user123", 
      "author": {
        "name": "Ahmed Ibrahim",
        "image": "https://example.com/avatar.jpg",
        "verified": true
      },
      "content": "Assalamu alaikum everyone!",
      "type": "text",
      "createdAt": "2025-09-14T22:42:05.785Z"
    },
    {
      "id": "message124",
      "userId": "system",
      "content": "Prayer session will begin in 5 minutes",
      "type": "system",
      "createdAt": "2025-09-14T22:47:05.785Z"
    }
  ],
  "hasMore": false
}
```

---

## Reviews

### Create Review

Create a review for a completed prayer session.

**Endpoint:** `POST /reviews`

**Authentication:** Required

#### Request Body

```json path=null start=null
{
  "prayerId": "prayer123",
  "rating": 5,
  "review": "Beautiful prayer session with great community. The host was very welcoming and the recitation was peaceful.",
  "tags": ["peaceful", "welcoming", "organized"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prayerId` | string | Yes | ID of completed prayer |
| `rating` | number | Yes | Rating 1-5 stars |
| `review` | string | No | Written review (max 1000 characters) |
| `tags` | array | No | Review tags |

#### Response

**Status:** `201 Created`

```json path=null start=null
{
  "id": "review123",
  "prayerId": "prayer123",
  "userId": "user123",
  "author": {
    "name": "Ahmed Ibrahim",
    "verified": true
  },
  "rating": 5,
  "review": "Beautiful prayer session with great community.",
  "tags": ["peaceful", "welcoming", "organized"],
  "createdAt": "2025-09-14T22:42:05.786Z"
}
```

### Get Prayer Reviews

Get all reviews for a specific prayer.

**Endpoint:** `GET /reviews/prayer/{prayerId}`

**Authentication:** Required

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prayerId` | string | Yes | Prayer ID |

#### Response

**Status:** `200 OK`

```json path=null start=null
{
  "reviews": [
    {
      "id": "review123",
      "userId": "user123",
      "author": {
        "name": "Ahmed Ibrahim",
        "verified": true
      },
      "rating": 5,
      "review": "Beautiful prayer session with great community.",
      "tags": ["peaceful", "welcoming", "organized"],
      "createdAt": "2025-09-14T22:42:05.786Z"
    }
  ],
  "averageRating": 4.8,
  "totalReviews": 12,
  "ratingDistribution": {
    "5": 8,
    "4": 3,
    "3": 1,
    "2": 0,
    "1": 0
  }
}
```

---

## Reports

### Create Report

Report inappropriate content or behavior.

**Endpoint:** `POST /api/reports`

**Authentication:** Required

#### Request Body

```json path=null start=null
{
  "targetType": "user",
  "targetId": "user456",
  "reason": "inappropriate_behavior",
  "description": "User was disruptive during prayer session and used inappropriate language.",
  "evidence": ["screenshot_url", "message_id"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `targetType` | string | Yes | "user", "prayer", "comment", "message" |
| `targetId` | string | Yes | ID of reported item |
| `reason` | string | Yes | Report reason code |
| `description` | string | Yes | Detailed description |
| `evidence` | array | No | Supporting evidence |

#### Report Reasons

- `inappropriate_behavior` - Disruptive or inappropriate conduct
- `harassment` - Harassment or bullying
- `spam` - Spam or irrelevant content  
- `religious_violation` - Violation of Islamic principles
- `safety_concern` - Safety or security concern
- `fake_profile` - Fake or misleading profile
- `other` - Other reason (requires description)

#### Response

**Status:** `201 Created`

```json path=null start=null
{
  "id": "report123",
  "targetType": "user",
  "targetId": "user456", 
  "reason": "inappropriate_behavior",
  "status": "pending",
  "submittedAt": "2025-09-14T22:42:05.787Z"
}
```

---

## Safety

### Send Emergency SOS

Send an emergency SOS alert to safety team and nearby community members.

**Endpoint:** `POST /api/safety/sos`

**Authentication:** Required

#### Request Body

```json path=null start=null
{
  "location": {
    "lat": 12.9716,
    "lng": 77.5946
  },
  "message": "Need immediate assistance at prayer location",
  "type": "emergency"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `location` | object | Yes | Current GPS coordinates |
| `message` | string | No | Additional context |
| `type` | string | Yes | "emergency", "safety_concern", "medical" |

#### Response

**Status:** `200 OK`

```json path=null start=null
{
  "id": "sos123",
  "status": "sent",
  "alertId": "alert_789",
  "message": "SOS alert sent to safety team and nearby verified users",
  "estimatedResponseTime": "5-10 minutes",
  "emergencyContacts": [
    {
      "type": "safety_team",
      "contact": "+1234567890"
    }
  ],
  "sentAt": "2025-09-14T22:42:05.788Z"
}
```

---

## Sharing

### Get Shareable Prayer Link

Get formatted sharing information for a prayer.

**Endpoint:** `GET /api/share/prayer/{id}`

**Authentication:** Required

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Prayer ID |

#### Response

**Status:** `200 OK`

```json path=null start=null
{
  "url": "https://praysap.com/prayers/prayer123",
  "deepLink": "praysap://prayer/prayer123",
  "text": "Join me for Fajr prayer on July 11th at 4:30 AM in Bangalore! 🕌",
  "shareData": {
    "title": "Fajr Prayer - July 11th",
    "description": "Join Ahmed Ibrahim for early morning prayer in Bangalore",
    "image": "https://praysap.com/api/prayer/prayer123/og-image",
    "type": "prayer"
  },
  "qrCode": "https://praysap.com/api/qr/prayer123",
  "socialMedia": {
    "twitter": "Join me for Fajr prayer tomorrow morning! 🕌 #PRAYSAP #Prayer",
    "whatsapp": "Assalamu alaikum! Join me for Fajr prayer tomorrow at 4:30 AM",
    "telegram": "🕌 Fajr Prayer Session - Tomorrow 4:30 AM in Bangalore"
  }
}
```

**Status:** `404 Not Found`

```json path=null start=null
{
  "error": {
    "message": "Prayer not found or not shareable",
    "code": "PRAYER_NOT_FOUND"
  }
}
```

---

## Community Guidelines

When interacting through the Community API, all users must follow PRAYSAP's community guidelines:

### Content Standards

- **Respectful Communication**: All messages and comments should be respectful and kind
- **Islamic Values**: Content should align with Islamic principles and values
- **Language**: Use appropriate language suitable for a diverse Muslim community
- **Relevance**: Keep discussions relevant to prayer and community topics

### Prohibited Content

- Offensive, abusive, or discriminatory language
- Spam or irrelevant promotional content
- Personal attacks or harassment
- Content that violates Islamic principles
- Sharing of personal contact information publicly

### Reporting and Moderation

- Use the reporting system to flag inappropriate content
- Reports are reviewed by trained moderators within 24 hours
- Community leaders have additional moderation capabilities
- Repeated violations may result in account restrictions

### Privacy and Safety

- Never share personal location details in public messages
- Use the SOS feature for genuine emergencies only
- Report safety concerns immediately
- Respect other users' privacy settings

---

## Best Practices

### Effective Communication

1. **Start with Islamic greetings** - "Assalamu alaikum" creates a welcoming atmosphere
2. **Be specific** - Clear communication helps avoid misunderstandings  
3. **Show appreciation** - Thank hosts and acknowledge contributions
4. **Ask questions** - Engage with the community to build connections

### Building Community

1. **Welcome newcomers** - Help new users feel included
2. **Share knowledge** - Offer helpful information about Islamic practices
3. **Be patient** - Remember users come from different backgrounds
4. **Create connections** - Foster meaningful relationships within the community

### Safety First

1. **Trust your instincts** - Report anything that feels unsafe
2. **Meet in public** - For first-time meetings, choose public locations
3. **Inform others** - Let someone know about your prayer attendance
4. **Use app features** - Utilize safety features like check-in and SOS
