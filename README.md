# API Documentation

#### Welcome to the FIGURAniS API documentation! This API serves as the backend for the FIGURAniS project, allowing users to manage their anime figure collection. The API provides endpoints for user authentication and retrieving figure data from a MongoDB database. To ensure security, authentication is required to access the figure-related endpoints, and users can only retrieve figures associated with their user ID.

# Authentication

## Login User

- Endpoint: POST /user/login

- This endpoint is used to log in a user and obtain an authentication token.

### Request Body:

```json
{
  "username": figuranis,
  "password": figuranis
}
```

### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzE4NzQ1MzQsImV4cCI6MTYzMTg3ODUzNH0.qyQrTmx0H3DsiIYJFLS1nGd7GEpdAF6S1qyLjg74WLU"
}
```

##### Note: The obtained token must be included in the Authorization header of subsequent requests as a Bearer token.

# Figures

## Get Figures

- Endpoint: GET /figures

  - This endpoint retrieves all the figures associated with the authenticated user.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Response:

```json
{
  "figures": [
    {
      "_id": "614c5ec9a5207e001f6ffabc",
      "title": "Figure 1",
      "character": "Character 1",
      "franchise": "Franchise 1",
      "purchased": true,
      "manufacturer": "Manufacturer 1",
      "material": "Material 1",
      "size": 10,
      "weight": 0.5,
      "price": 100,
      "image": "https:/discord/image1.jpg"
    },
    {
      "_id": "614c5ed8a5207e001f6ffabd",
      "title": "Figure 2",
      "character": "Character 2",
      "franchise": "Franchise 2",
      "purchased": false,
      "manufacturer": "Manufacturer 2",
      "material": "Material 2",
      "size": 15,
      "weight": 0.7,
      "price": 150,
      "image": "https:/discord/image2.jpg"
    }
  ]
}
```

## Get Figure by ID

- Endpoint: GET /figures/:id

  - This endpoint retrieves a specific figure by its ID. Only figures associated with the authenticated user can be accessed.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Response:

```json
{
  "_id": "614c5ec9a5207e001f6ffabc",
  "title": "Figure 1",
  "character": "Character 1",
  "franchise": "Franchise 1",
  "purchased": true,
  "manufacturer": "Manufacturer 1",
  "material": "Material 1",
  "size": 10,
  "weight": 0.5,
  "price": 100,
  "image": "https:/discord/image1.jpg"
}
```

## Delete Figure

- Endpoint: DELETE /figures/:id

  - This endpoint deletes a specific figure by its ID. Only figures associated with the authenticated user can be deleted.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Response:

```json
{
  "message": "Figure deleted successfully"
}
```

## Update Figure

- Endpoint: PUT /figures/:id

  - This endpoint updates a specific figure by its ID. Only figures associated with the authenticated user can be updated.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Request Body:

````json
{
  "title": "Updated Figure",
  "character": "Updated Character",
  "franchise": "Updated Franchise",
  "purchased": true,
  "manufacturer": "Updated Manufacturer",
  "material": "Updated Material",
  "size": 20,
  "weight": 1.2,
  "price": 200,
  "image": "https:/discord/updated-image.jpg"
}

### Response:

```json
{
  "message": "Figure updated successfully"
}
````

# Technologies

The FIGURAniS API is built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Jest (for testing)
- Supertest (for API testing)
