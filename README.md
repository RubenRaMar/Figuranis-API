# <div align="center">API Documentation</div>

#### Welcome to the FIGURAniS API documentation! This API serves as the backend for the FIGURAniS project, allowing users to manage their anime figure collection. The API provides endpoints for user authentication and retrieving figure data from a MongoDB database. To ensure security, authentication is required to access the figure-related endpoints, and users can only retrieve figures associated with their user ID.

# <div align="center">Authentication</div>

## <div align="center">👉Login User👈</div>

- Endpoint: POST /user/login

- This endpoint is used to log in a user and obtain an authentication token.

### Request Body:

```json
{
  "username": admin,
  "password": admin
}
```

### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OTA4MDk4MDk4MDk4MDk4IiwibmFtZSI6ImlzZGljb3VkYWhzIiwiaWF0IjoxNjg0MTUxNzEwLCJleHAiOjE2ODQyMzgxMTB9.8nONfhY3flP0sw2T1251a6freHSEb1eF4hRcSiA9gyA"
}
```

##### Note: The obtained token must be included in the Authorization header of subsequent requests as a Bearer token.

# <div align="center">Figures</div>

## <div align="center">👉Get Figures👈</div>

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
      "isPurchased": true,
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
      "isPurchased": false,
      "manufacturer": "Manufacturer 2",
      "material": "Material 2",
      "size": 15,
      "weight": 0.7,
      "price": 150,
      "image": "https:/discord/image2.jpg"
    }
  ],
  "length": 2
}
```

## <div align="center">👉Get Figure by ID👈</div>

- Endpoint: GET /figures/:id

  - This endpoint retrieves a specific figure by its ID. Only figures associated with the authenticated user can be accessed.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Response:

```json
{
  "figure": {
    "title": "Jimei Palace Enel the god of thunder One Piece",
    "character": "Enel",
    "franchise": "One Piece",
    "isPurchased": true,
    "manufacturer": "Jimei Palace",
    "material": "Resin + LED",
    "size": 62,
    "weight": 9.87,
    "price": 1599,
    "image": "https://i.ibb.co/5Mv33z5/enel.webp",
    "user": "646fc50910c8e8c5b17d54a7",
    "id": "6489adcd75f15c7f21954b8b"
  }
}
```

## <div align="center">👉Delete Figure👈</div>

- Endpoint: DELETE /figures/delete/:id

  - This endpoint deletes a specific figure by its ID. Only figures associated with the authenticated user can be deleted.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Response:

```json
{
  "message": "The figure has been removed"
}
```

## <div align="center">👉Update Figure👈</div>

- Endpoint: PUT /figures/:id

  - This endpoint updates a specific figure by its ID. Only figures associated with the authenticated user can be updated.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Request Body:

```json
{
  "title": "Updated Figure",
  "character": "Updated Character",
  "franchise": "Updated Franchise",
  "isPurchased": true,
  "manufacturer": "Updated Manufacturer",
  "material": "Updated Material",
  "size": 20,
  "weight": 1.2,
  "price": 200,
  "image": "https:/discord/updated-image.jpg"
}
```

### Response:

```json
{
  "message": "The figure could not be updated"
}
```

## <div align="center">👉Add Figure👈</div>

- Endpoint: PUT /figures/:id

  - This endpoint adds a specific figure by sending it in the body. It will be added in the database associated to the user.

### Request Headers:

```makefile
Authorization: Bearer <token>
```

### Request Body:

```json
{
  "title": "Dragon Ball Fat Buu BT Studio",
  "character": "Fat Buu",
  "franchise": "Dragon Ball",
  "isPurchased": false,
  "manufacturer": "BT Studio",
  "material": "Resin",
  "size": 30,
  "weight": 2.87,
  "price": 205.4,
  "image": "https://i.ibb.co/rsWcdcc/fat-boo-dog.webp"
}
```

### Response:

```json
{
  "figure": {
    "user": "646fc50910c8e8c5b17d54a7",
    "id": "6490128f5b7e2763363c4d7b",
    "title": "Dragon Ball Fat Buu BT Studio",
    "character": "Fat Buu",
    "franchise": "Dragon Ball",
    "isPurchased": false,
    "manufacturer": "BT Studio",
    "material": "Resin",
    "size": 30,
    "weight": 2.87,
    "price": 205.4,
    "image": "https://i.ibb.co/rsWcdcc/fat-boo-dog.webp"
  }
}
```

# Technologies

The FIGURAniS API is built using the following technologies:

<div align="center">  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="25" /></a>
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="25" /></a>
<a href="https://www.mongodb.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="MongoDB" height="25" /></a>
<a href="https://mongoosejs.com/" target="_blank"><img style="margin: 10px" src="https://miro.medium.com/v2/resize:fit:370/1*jO715XDC1YAEsWUwovWUQw.png" alt="mongoosejs" height="25" /></a>
<a href="https://www.jestjs.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/jest.svg" alt="Jest" height="25" /></a>
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="25" /></a>
<a href="https://jwt.io/" target="_blank"><img style="margin: 10px" src="https://thekenyandev.com/static/ba180df420dbaffd7405a0f65764feab/cover.png" alt="jwt" height="25" /></a>
<a href="https://www.npmjs.com/package/bcryptjs" target="_blank"><img style="margin: 10px" src="https://bcrypt.live/wp-content/uploads/2021/10/Website-Logo1.png" alt="bcryptjs" height="25" /></a>
<a href="https://www.npmjs.com/package/supertest" target="_blank"><img style="margin: 10px" src="https://camo.githubusercontent.com/fcca6a233a54a037861c99ab17d255d215807e6c0fcdce7d16a1a67814ede820/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3333383935382f696d616765732f313439363334352f7375706572746573742e706e67" alt="supertest" height="25" /></a>

</div>
