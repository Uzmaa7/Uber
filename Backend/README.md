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



## Register Captain Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/captains/register`

### Description
This endpoint allows captains to register by providing their personal details and vehicle information. The password is hashed before storing in the database.

### Request Body
The request must be in JSON format with the following fields:

- `fullname` (object, required):
  - `firstname` (string, required): Minimum 3 characters
  - `lastname` (string, optional): Minimum 3 characters if provided
- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 6 characters
- `contact` (string, required): Captain's contact number
- `vehicle` (object, required):
  - `color` (string, required): Minimum 3 characters
  - `plate` (string, required): Vehicle plate number, minimum 3 characters
  - `capacity` (integer, required): Vehicle capacity (minimum 1)
  - `vehicleType` (string, required): One of "car", "motorcycle", or "auto"

### Response

#### Success (201 Created)
```json
{
  "statusCode": 201,
  "data": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Mike",
      "lastname": "Johnson"
    },
    "email": "mike.johnson@example.com",
    "contact": "1234567890",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "socketId": null,
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  },
  "message": "Captain registered successfully",
  "success": true
}
```



## Login Captain Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/captains/login`

### Description
This endpoint allows existing captains to log in by providing their email and password. Upon successful login, access and refresh tokens are generated and set as HTTP-only cookies.

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
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Johnson"
      },
      "email": "mike.johnson@example.com",
      "contact": "1234567890",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "Captain logged in Successfully",
  "success": true
}
```
Additionally, `accessToken` and `refreshToken` are set as HTTP-only, secure cookies.



## Logout Captain Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/captains/logout`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint logs out the authenticated captain by clearing the refresh token from the database and removing the access and refresh token cookies.

### Request Body
No request body required.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {},
  "message": "Captain logged out successfully",
  "success": true
}
```
Additionally, `accessToken` and `refreshToken` cookies are cleared.



## Get Captain Profile Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/captains/profile`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint retrieves the profile information of the authenticated captain.

### Request Body
No request body required.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Mike",
        "lastname": "Johnson"
      },
      "email": "mike.johnson@example.com",
      "contact": "1234567890",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "socketId": null,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "Captain profile fetched successfully",
  "success": true
}
```

## Get Coordinates Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/maps/get-coordinates`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint retrieves the latitude and longitude coordinates for a given address.

### Query Parameters
- `address` (string, required): The address to get coordinates for, minimum 3 characters.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "coordinates": {
      "lat": 37.7749,
      "lng": -122.4194
    }
  },
  "message": "Co-ordinates fetched successfully",
  "success": true
}
```

#### Error (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Co-ordinates not found!",
  "success": false
}
```

## Get Distance and Time Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/maps/get-distance-time`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint calculates the distance and estimated travel time between two locations.

### Query Parameters
- `origin` (string, required): The starting address, minimum 3 characters.
- `destination` (string, required): The destination address, minimum 3 characters.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "distanceTime": {
      "distance": {
        "text": "10.5 km",
        "value": 10500
      },
      "duration": {
        "text": "15 mins",
        "value": 900
      }
    }
  },
  "message": "Distance and Time fetched successfully",
  "success": true
}
```

## Get Auto-Complete Suggestions Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/maps/get-suggestions`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint provides auto-complete suggestions for addresses based on user input.

### Query Parameters
- `input` (string, required): The partial address input, minimum 3 characters.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "suggestions": [
      {
        "description": "San Francisco, CA, USA",
        "place_id": "ChIJIQBpAG2ahYAR_6128GcTjz0"
      },
      {
        "description": "San Francisco International Airport (SFO), San Francisco, CA, USA",
        "place_id": "ChIJVVVVVYqAhYARXebK-0tQXcI"
      }
    ]
  },
  "message": "Auto-complete suggestions fetched successfully",
  "success": true
}
```

## Create Ride Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/rides/create`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint allows users to create a new ride request by specifying pickup location, destination, and vehicle type.

### Request Body
The request must be in JSON format with the following fields:

- `pickup` (string, required): Pickup location, minimum 3 characters.
- `destination` (string, required): Destination location, minimum 3 characters.
- `vehicleType` (string, required): One of "auto", "car", or "motorcycle".

### Response

#### Success (201 Created)
```json
{
  "statusCode": 201,
  "data": {
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "captain": null,
      "pickup": "San Francisco",
      "destination": "Los Angeles",
      "fare": 150,
      "status": "pending",
      "duration": 900,
      "distance": 10500,
      "paymentID": null,
      "orderId": null,
      "signature": null,
      "otp": "123456",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "Ride created successfully",
  "success": true
}
```

## Get Fare Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/rides/get-fare`

### Authentication
Requires a valid JWT access token (via cookies or Authorization header).

### Description
This endpoint calculates the fare for a ride based on pickup and destination locations.

### Query Parameters
- `pickup` (string, required): Pickup address, minimum 3 characters.
- `destination` (string, required): Destination address, minimum 3 characters.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "fare": {
      "auto": 50,
      "car": 100,
      "motorcycle": 30
    }
  },
  "message": "Fare calculated successfully",
  "success": true
}
```

## Confirm Ride Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/rides/confirm-ride`

### Authentication
Requires a valid captain JWT access token (via cookies or Authorization header).

### Description
This endpoint allows captains to confirm a ride request.

### Request Body
The request must be in JSON format with the following fields:

- `rideId` (string, required): The ID of the ride to confirm, must be a valid MongoDB ObjectId.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "captain": "captain_id",
      "pickup": "San Francisco",
      "destination": "Los Angeles",
      "fare": 100,
      "status": "accepted",
      "duration": 900,
      "distance": 10500,
      "paymentID": null,
      "orderId": null,
      "signature": null,
      "otp": "123456",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "Ride confirmed successfully",
  "success": true
}
```

#### Error (404 Not Found)
```json
{
  "statusCode": 404,
  "message": "Ride not found or already confirmed",
  "success": false
}
```

## Start Ride Endpoint

### HTTP METHOD
`GET`

### Endpoint
`/api/v1/rides/start-ride`

### Authentication
Requires a valid captain JWT access token (via cookies or Authorization header).

### Description
This endpoint allows captains to start a ride by providing the OTP.

### Query Parameters
- `otp` (string, required): The 6-digit OTP for the ride.
- `rideId` (string, required): The ID of the ride to start, must be a valid MongoDB ObjectId.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "captain": "captain_id",
      "pickup": "San Francisco",
      "destination": "Los Angeles",
      "fare": 100,
      "status": "ongoing",
      "duration": 900,
      "distance": 10500,
      "paymentID": null,
      "orderId": null,
      "signature": null,
      "otp": "123456",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "Ride started!! Happy Journey",
  "success": true
}
```

## End Ride Endpoint

### HTTP METHOD
`POST`

### Endpoint
`/api/v1/rides/end-ride`

### Authentication
Requires a valid captain JWT access token (via cookies or Authorization header).

### Description
This endpoint allows captains to end a ride.

### Request Body
The request must be in JSON format with the following fields:

- `rideId` (string, required): The ID of the ride to end, must be a valid MongoDB ObjectId.

### Response

#### Success (200 OK)
```json
{
  "statusCode": 200,
  "data": {
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "captain": "captain_id",
      "pickup": "San Francisco",
      "destination": "Los Angeles",
      "fare": 100,
      "status": "completed",
      "duration": 900,
      "distance": 10500,
      "paymentID": null,
      "orderId": null,
      "signature": null,
      "otp": "123456",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  },
  "message": "Ride Ended",
  "success": true
}
```

