# Food Delivery Application

A comprehensive food delivery platform with customer and admin interfaces. This full-stack application allows customers to browse menus, place orders, and track deliveries, while providing administrators with tools to manage menu items, process orders, and handle user accounts.

### Customer Features
- User registration and authentication
- Browse food menu with categories
- Search functionality
- Shopping cart
- Order placement and tracking
- User profile management
- Responsive design for mobile and desktop

### Admin Features
- Admin dashboard with analytics
- Menu management (add, edit, delete items)
- Order processing and status updates
- User management
- Profile management

## Project Structure

The project is divided into three main directories:

```
Food-Delivery/
  ├── client/           # Customer-facing React frontend
  ├── admin/            # Admin dashboard React frontend
  ├── server/           # Express.js backend API
  └── README.md         # Project documentation
```

## Tech Stack

### Frontend
- React.js
- React Router
- Context API for state management
- CSS for styling
- Axios for API communication

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Client Setup
```bash
cd client
npm install
npm start
```

### Admin Setup
```bash
cd admin
npm install
npm start
```

### Server Setup
```bash
cd server
npm install
# Create .env file with required environment variables
npm start
```

## Environment Variables

### Server (.env)
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage

1. Start the server first
2. Launch the client application
3. Launch the admin dashboard
4. Use the following default admin credentials:
   - Email: admin@example.com
   - Password: admin123

## Development

For a development environment with hot-reload:

```bash
# Client
cd client
npm run dev

# Admin
cd admin
npm run dev

# Server
cd server
npm run dev
```

## API Documentation

Detailed API documentation is available in the server's README.md file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Food images from [Unsplash](https://unsplash.com/)
- Icon library from [FontAwesome](https://fontawesome.com/) 
