# Auratech Backend API

Complete backend API for Auratech website built with Node.js, Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication** (Register/Login with JWT)
- **Contact Form Management** (CRUD operations)
- **MongoDB Database** with Mongoose ODM
- **Password Hashing** with bcryptjs
- **JWT Token Authentication**
- **CORS Enabled**
- **Error Handling**
- **Environment Variables**

## 📁 Project Structure

```
backend/
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── contactController.js  # Contact form logic
├── models/
│   ├── User.js             # User schema & model
│   └── Contact.js          # Contact schema & model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── contactRoutes.js    # Contact routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── config/
│   └── db.js              # Database configuration
├── .env                   # Environment variables
├── server.js              # Main server file
└── package.json           # Dependencies & scripts
```

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/auratech
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. Start MongoDB server

5. Run the application:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
- **POST** `/api/auth/register`
- **Description**: Register a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Description**: Login existing user
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here"
    }
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Description**: Get current logged in user info
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

### Contact Routes (`/api/contact`)

#### Create Contact Message
- **POST** `/api/contact`
- **Description**: Submit contact form
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I am interested in your services"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Contact message sent successfully",
    "data": {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I am interested in your services",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### Get All Contacts (Admin)
- **GET** `/api/contact`
- **Description**: Get all contact messages
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "success": true,
    "count": 5,
    "data": [
      {
        "_id": "contact_id",
        "name": "John Doe",
        "email": "john@example.com",
        "message": "I am interested in your services",
        "status": "pending",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
  ```

#### Get Single Contact (Admin)
- **GET** `/api/contact/:id`
- **Description**: Get specific contact message
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I am interested in your services",
      "status": "pending",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### Update Contact Status (Admin)
- **PUT** `/api/contact/:id`
- **Description**: Update contact message status
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Body**:
  ```json
  {
    "status": "read"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Contact status updated",
    "data": {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I am interested in your services",
      "status": "read",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### Delete Contact (Admin)
- **DELETE** `/api/contact/:id`
- **Description**: Delete contact message
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Contact message deleted"
  }
  ```

## 🔐 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **CORS Enabled**: Cross-origin resource sharing enabled
- **Input Validation**: Request body validation with error handling
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing with Postman

### Register User Test
1. Set method to `POST`
2. URL: `http://localhost:5000/api/auth/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

### Login User Test
1. Set method to `POST`
2. URL: `http://localhost:5000/api/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

### Contact Form Test
1. Set method to `POST`
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "name": "Test Contact",
     "email": "contact@example.com",
     "message": "This is a test message"
   }
   ```

## 📝 Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Invalid token/credentials)
- `404` - Not Found
- `500` - Internal Server Error

## 🌐 Health Check

- **GET** `http://localhost:5000/`
- Returns API status and available endpoints

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing

## 🚀 Deployment Notes

1. Set `NODE_ENV=production` in environment
2. Update `MONGO_URI` to production MongoDB URL
3. Use a strong `JWT_SECRET` in production
4. Ensure MongoDB is accessible from your server

## 📞 Support

For any issues or questions, please contact the Auratech development team.
