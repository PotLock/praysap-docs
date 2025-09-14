# PRAYSAP API Reference

Welcome to the PRAYSAP API documentation. This API enables developers to integrate with the PRAYSAP platform for Muslim prayer community features.

## Base URL

**Production Server:** `https://praysap-backend-production.up.railway.app`

## API Version

**Version:** 1.0.0  
**OpenAPI Specification:** 3.0

## Authentication

Most endpoints require authentication. The API uses bearer token authentication for user endpoints and admin authentication for administrative functions.

### User Authentication
- User endpoints require authentication through Web3Auth integration
- Users must be verified through Shahada verification for full access

### Admin Authentication  
- Admin endpoints require admin login credentials
- Some endpoints are restricted to superadmin level access

## Rate Limiting

To ensure fair usage and system stability, the API implements rate limiting. Please implement appropriate backoff strategies in your applications.

## Response Formats

All API responses are in JSON format. Standard HTTP status codes are used:

- **200**: Success
- **201**: Created
- **400**: Bad Request - Invalid input
- **401**: Unauthorized - Authentication required
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error

## Error Handling

Error responses follow this format:

```json
{
  "error": {
    "message": "Description of the error",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

## API Endpoints Overview

### Core Functionality

| Section | Description |
|---------|-------------|
| **[Prayers](./prayers.md)** | Create, manage, join, and discover prayer sessions |
| **[Users](./users.md)** | User profiles, verification, and preferences |
| **[Community](./community.md)** | Comments, messages, reviews, and social features |

### Administrative

| Section | Description |
|---------|-------------|
| **[Admin](./admin.md)** | Administrative functions and user management |
| **[Moderation](./moderation.md)** | Content moderation and safety features |
| **[Analytics](./analytics.md)** | Platform statistics and reporting |

### Utility

| Section | Description |
|---------|-------------|
| **[Waitlist](./waitlist.md)** | Waitlist management for new users |
| **[Safety](./safety.md)** | Emergency features and security |
| **[Sharing](./sharing.md)** | Social sharing functionality |

## Getting Started

1. **Authentication**: Integrate with Web3Auth for user authentication
2. **Profile Creation**: Use the `/api/users/upsert` endpoint to create user profiles
3. **Verification**: Implement Shahada verification using `/api/users/{userId}/verify-shahada`
4. **Prayer Discovery**: Use `/api/prayers` to discover available prayers
5. **Join Community**: Enable users to join prayers and interact with the community

## Interactive Documentation

For testing API endpoints interactively, visit our Swagger UI:
[https://praysap-backend-production-fe3b.up.railway.app/api/docs/](https://praysap-backend-production-fe3b.up.railway.app/api/docs/)

## SDKs and Libraries

Coming soon - we're working on official SDKs for popular programming languages and frameworks.

## Support

For API support and questions:

- 📧 **Developer Support**: api@praysap.com
- 💬 **Community**: Join our developer Discord
- 📚 **Documentation Issues**: Report on GitHub

---

*"And establish prayer and give zakah and bow with those who bow [in worship and obedience]."* - Quran 2:43
