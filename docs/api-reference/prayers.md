# Prayers API

The Prayers API enables creation, management, and discovery of prayer sessions within the PRAYSAP platform.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/prayers` | Create a new prayer |
| GET | `/api/prayers` | Search and discover prayers |
| GET | `/api/prayers/{id}` | Get specific prayer details |
| POST | `/api/prayers/{id}/join` | Join a prayer session |
| POST | `/api/prayers/{id}/leave` | Leave a prayer session |
| POST | `/api/prayers/{id}/check-in` | Check-in to a prayer |
| GET | `/api/prayers/map` | Get prayers for map view |

---

## Create Prayer

Create a new prayer session. Prayer times are automatically calculated based on type, date, and location.

**Endpoint:** `POST /api/prayers`

**Authentication:** Required

### Request Body

```json path=/api/prayers start=null
{
  "type": "Fajr",
  "date": "2025-08-01", 
  "location": {
    "address": "Bangalore, India",
    "geo": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  },
  "spaceType": "Home",
  "genderPolicy": {
    "type": "MEN"
  },
  "description": "Early morning prayer at my home.",
  "capacity": 10,
  "unlimitedCapacity": false,
  "resources": [
    {
      "type": "Prayer mats",
      "available": 5,
      "requested": 2
    }
  ],
  "recurrence": "none",
  "locationPrivacy": "exact",
  "autoApproveAttendees": true
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Prayer type: "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jummah" |
| `date` | string | Yes | Prayer date in YYYY-MM-DD format |
| `location.address` | string | Yes | Human-readable address |
| `location.geo` | object | Yes | GeoJSON Point with coordinates [longitude, latitude] |
| `spaceType` | string | Yes | Type of space: "Home", "Mosque", "Office", "Outdoor", etc. |
| `genderPolicy.type` | string | Yes | Gender policy: "MEN", "WOMEN", "MIXED" |
| `description` | string | No | Description of the prayer session |
| `capacity` | number | No | Maximum number of attendees |
| `unlimitedCapacity` | boolean | No | Whether to allow unlimited attendees |
| `resources` | array | No | Available resources (prayer mats, etc.) |
| `recurrence` | string | No | Recurrence pattern: "none", "daily", "weekly" |
| `locationPrivacy` | string | No | Location visibility: "exact", "approximate", "hidden" |
| `autoApproveAttendees` | boolean | No | Whether to auto-approve join requests |

### Response

**Status:** `201 Created`

```json path=null start=null
{
  "id": "prayer_id_123",
  "type": "Fajr",
  "date": "2025-07-01T04:30:00.000Z",
  "time": "04:30",
  "location": {
    "geo": {
      "type": "Point", 
      "coordinates": [77.5946, 12.9716]
    },
    "address": "123 Main St, Bangalore"
  },
  "genderPolicy": {
    "type": "MEN"
  },
  "description": "Early morning prayer at my home.",
  "rules": ["Bring your own prayer mat"],
  "capacity": 10,
  "unlimitedCapacity": false,
  "resources": [
    {
      "type": "mat",
      "available": 5,
      "requested": 2
    }
  ],
  "spaceType": "Home",
  "recurrence": "none", 
  "locationPrivacy": "exact",
  "autoApproveAttendees": true,
  "host": {
    "userId": "user123",
    "name": "Host Name"
  },
  "attendees": [],
  "status": "scheduled",
  "createdAt": "2025-07-01T00:00:00.000Z"
}
```

---

## Search Prayers

Discover prayers based on various filters and search criteria.

**Endpoint:** `GET /api/prayers`

**Authentication:** Required

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `location` | string | Filter by location/address |
| `type` | string | Filter by prayer type |
| `date` | string | Filter by specific date |
| `gender` | string | Filter by gender policy |
| `radius` | number | Search radius in kilometers |
| `lat` | number | Latitude for location-based search |
| `lng` | number | Longitude for location-based search |
| `page` | number | Page number for pagination |
| `limit` | number | Number of results per page |
| `sort` | string | Sort order: "dateAsc", "dateDesc", "distance" |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "items": [
    {
      "id": "prayer_id_123",
      "type": "Fajr",
      "date": "2025-07-01T04:30:00.000Z",
      "time": "04:30",
      "location": {
        "address": "Bangalore, India",
        "approximate": {
          "type": "Point",
          "coordinates": [77.59, 12.97]
        }
      },
      "host": {
        "name": "Host Name",
        "verified": true
      },
      "capacity": 10,
      "attendeesCount": 3,
      "availableSpots": 7,
      "distance": 2.5
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "hasNextPage": true
}
```

---

## Get Prayer Details

Retrieve detailed information about a specific prayer.

**Endpoint:** `GET /api/prayers/{id}`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Prayer ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "id": "prayer_id_123",
  "type": "Fajr", 
  "date": "2025-07-01T04:30:00.000Z",
  "time": "04:30",
  "location": {
    "geo": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    },
    "address": "123 Main St, Bangalore"
  },
  "host": {
    "userId": "host123",
    "name": "Host Name",
    "verified": true,
    "image": "https://example.com/avatar.jpg"
  },
  "description": "Early morning prayer at my home.",
  "rules": ["Bring your own prayer mat", "Arrive 10 minutes early"],
  "genderPolicy": {
    "type": "MEN"
  },
  "capacity": 10,
  "attendees": [
    {
      "userId": "user456", 
      "name": "Attendee Name",
      "joinedAt": "2025-06-30T20:00:00.000Z",
      "status": "confirmed"
    }
  ],
  "resources": [
    {
      "type": "Prayer mats",
      "available": 5,
      "requested": 2
    }
  ],
  "spaceType": "Home",
  "status": "scheduled",
  "createdAt": "2025-06-30T18:00:00.000Z",
  "updatedAt": "2025-06-30T19:30:00.000Z"
}
```

**Status:** `404 Not Found`

```json path=null start=null
{
  "error": {
    "message": "Prayer not found",
    "code": "PRAYER_NOT_FOUND"
  }
}
```

---

## Join Prayer

Join a prayer session as an attendee.

**Endpoint:** `POST /api/prayers/{id}/join`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Prayer ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Successfully joined prayer",
  "status": "confirmed",
  "joinedAt": "2025-06-30T20:00:00.000Z"
}
```

**Status:** `400 Bad Request`

```json path=null start=null
{
  "error": {
    "message": "Already joined or request pending",
    "code": "ALREADY_JOINED"
  }
}
```

---

## Leave Prayer

Leave a prayer session you previously joined.

**Endpoint:** `POST /api/prayers/{id}/leave`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Prayer ID |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Successfully left prayer",
  "leftAt": "2025-06-30T21:00:00.000Z"
}
```

**Status:** `400 Bad Request`

```json path=null start=null
{
  "error": {
    "message": "Not an attendee of this prayer",
    "code": "NOT_ATTENDEE"
  }
}
```

---

## Check-in to Prayer

Check-in to a prayer event to confirm attendance.

**Endpoint:** `POST /api/prayers/{id}/check-in`

**Authentication:** Required

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Prayer ID |

### Request Body

```json path=null start=null
{
  "lat": 12.9716,
  "lng": 77.5946
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lat` | number | Yes | Current latitude |
| `lng` | number | Yes | Current longitude |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "message": "Successfully checked in",
  "checkedInAt": "2025-07-01T04:25:00.000Z",
  "distance": 0.05
}
```

**Status:** `400 Bad Request`

```json path=null start=null
{
  "error": {
    "message": "Too far from prayer location or invalid time",
    "code": "CHECKIN_VALIDATION_ERROR"
  }
}
```

---

## Get Map View

Get prayers formatted for map display with location markers.

**Endpoint:** `GET /api/prayers/map`

**Authentication:** Required

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bounds` | string | Map bounds in format "lat1,lng1,lat2,lng2" |
| `zoom` | number | Current map zoom level |
| `type` | string | Filter by prayer type |

### Response

**Status:** `200 OK`

```json path=null start=null
{
  "markers": [
    {
      "id": "prayer_id_123",
      "type": "Fajr",
      "coordinates": [77.5946, 12.9716],
      "time": "04:30",
      "date": "2025-07-01",
      "attendeesCount": 3,
      "capacity": 10,
      "genderPolicy": "MEN",
      "host": {
        "name": "Host Name",
        "verified": true
      }
    }
  ],
  "bounds": {
    "north": 13.0,
    "south": 12.9,
    "east": 77.7,
    "west": 77.5
  }
}
```

---

## Prayer Types

Supported prayer types:

- **Fajr** - Dawn prayer
- **Dhuhr** - Midday prayer  
- **Asr** - Afternoon prayer
- **Maghrib** - Sunset prayer
- **Isha** - Night prayer
- **Jummah** - Friday prayer
- **Tarawih** - Ramadan night prayer
- **Eid** - Eid prayers

## Gender Policies

- **MEN** - Men only
- **WOMEN** - Women only  
- **MIXED** - Mixed gender with appropriate arrangements

## Space Types

- **Home** - Private residence
- **Mosque** - Mosque or Islamic center
- **Office** - Workplace prayer room
- **Outdoor** - Park or outdoor location
- **Community** - Community center
- **School** - Educational institution

## Prayer Status

- **scheduled** - Prayer is scheduled and accepting attendees
- **in_progress** - Prayer is currently happening
- **completed** - Prayer has finished
- **cancelled** - Prayer has been cancelled
- **archived** - Prayer has been archived
