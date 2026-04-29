# Backend API Documentation

This document describes backend endpoints (path, method, auth, request fields, and example response). Paths are relative to the API base: /api/v1.

## Register User Endpoint
 
### HTTP METHOD 

`POST 

### Endpoint

`/api/v1/users/register`

### Description
This endpoint allows users to register by providing their personal details including first name, last name (optional), email, and password. The password is hashed before storing in the database.

### Request Body
The request must be in JSON format with the following fields:

- `fullname` (object, required):
  - `firstname` (string, required): Minimum 3 characters
  - `lastname` (string, optional): Minimum 3 characters if provided
- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 6 characters

### Response

#### Success (201 Created)
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "refreshToken": null,
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

#### Error Responses
- 400 Bad Request: Validation errors (e.g., invalid email, short password) or missing required fields
- 409 Conflict: User with the same email already exists
- 500 Internal Server Error: Server error during registration

## Login User Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/users/login`

### Description
This endpoint allows existing users to log in by providing their email and password. Upon successful login, access and refresh tokens are generated and set as HTTP-only cookies.

### Request Body
The request must be in JSON format with the following fields:

- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 6 characters

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "User logged in Successfully",
  "success": true
}
```
Additionally, `accessToken` and `refreshToken` are set as HTTP-only, secure cookies.

#### Error Responses
- 400 Bad Request: Validation errors (e.g., invalid email, short password) or missing required fields
- 401 Unauthorized: Invalid email or password
- 500 Internal Server Error: Server error during login

## Logout User Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/users/logout`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint logs out the authenticated user by clearing the refresh token from the database and removing the access and refresh token cookies.

### Request Body
No request body required.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged Out",
  "success": true
}
```
Additionally, `accessToken` and `refreshToken` cookies are cleared.

#### Error Responses
- 401 Unauthorized: Invalid or missing access token
- 500 Internal Server Error: Server error during logout

## Get User Profile Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/users/profile`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint retrieves the profile information of the authenticated user.

### Request Body
No request body required.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "User Fetched successfully",
  "success": true
}
```

#### Error Responses
- 401 Unauthorized: Invalid or missing access token
- 500 Internal Server Error: Server error during profile fetch