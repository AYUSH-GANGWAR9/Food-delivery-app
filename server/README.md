# Food Delivery API Server

This is the backend server for the Food Delivery application, providing API endpoints for user authentication, food menu management, orders, and admin functionalities.

## Technologies

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT Authentication
- Multer (for file uploads)

## Directory Structure

```
server/
  ├── config/           # Configuration files
  │   └── db.js         # Database connection setup
  ├── controllers/      # Controller functions for handling requests
  │   ├── adminController.js
  │   ├── foodController.js  
  │   ├── orderController.js
  │   └── userController.js
  ├── models/           # MongoDB schemas and models
  │   ├── adminModel.js
  │   ├── foodModel.js
  │   ├── orderModel.js
  │   └── userModel.js
  ├── routes/           # API route definitions
  │   ├── adminRoute.js
  │   ├── foodRoutes.js
  │   ├── orderRoute.js
  │   └── userRoute.js
  ├── uploads/          # Directory for uploaded files
  │   └── profile/      # Profile images
  ├── .env              # Environment variables (not tracked in git)
  ├── package.json      # Dependencies and scripts
  └── server.js         # Main entry point
```

## API Endpoints

### User Routes
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile (requires authentication)

### Food Routes
- `GET /api/food/list` - Get all menu items
- `GET /api/food/:id` - Get a specific menu item
- `POST /api/food/add` - Add a new menu item (admin only)
- `PUT /api/food/:id` - Update a menu item (admin only)
- `DELETE /api/food/:id` - Delete a menu item (admin only)

### Order Routes
- `POST /api/orders/create` - Create a new order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/user` - Get orders for current user
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Admin Routes
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Register a new admin (super admin only)
- `PUT /api/admin/profile` - Update admin profile
- `POST /api/admin/uploadProfileImage` - Upload admin profile image

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 404: Not found
- 500: Server error

Response format follows:
```json
{
  "success": true/false,
  "message": "Description of the result",
  "data": {} // Optional data object
}
``` 