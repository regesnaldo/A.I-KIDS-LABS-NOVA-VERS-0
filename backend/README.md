# A.I. KIDS LABS - Backend

## Overview
Backend for A.I. Kids Labs educational platform with 3D educational layer, subscription management via PagSeguro, and comprehensive user management.

## Features
- User authentication and authorization (JWT)
- 50 educational modules with quizzes and progress tracking
- 3D educational components
- Parental control system
- PagSeguro payment integration for monthly subscriptions
- Progress tracking and gamification (badges, stars)
- Video placeholders with lazy loading

## Tech Stack
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- PagSeguro API for payment processing
- CORS, Morgan, Helmet for security and logging

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the required environment variables
5. Start the server:
   ```bash
   npm run dev  # for development
   npm start    # for production
   ```

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-kids-labs
USE_MONGODB=false

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# PagSeguro Configuration
PAGSEGURO_TOKEN=your_pagseguro_token_here
PAGSEGURO_EMAIL=your_pagseguro_email_here
PAGSEGURO_ENV=sandbox

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend and Backend URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

# Other Configuration
MAX_FILE_SIZE=10485760
```

## API Endpoints

### Modules
- `GET /api/modules` - Get all modules
- `GET /api/modules/:id` - Get specific module
- `POST /api/modules/:id/progress` - Update module progress

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/progress` - Get user progress

### Payments (PagSeguro)
- `POST /api/payments/plan` - Create subscription plan
- `POST /api/payments/subscribe` - Subscribe user to plan
- `GET /api/payments/subscription` - Get user subscription status
- `DELETE /api/payments/subscription` - Cancel user subscription
- `GET /api/payments/subscription/:subscriptionId` - Get subscription details
- `POST /api/payments/webhook` - PagSeguro webhook (do not call manually)
- `POST /api/payments/notification` - PagSeguro notification endpoint

## Payment Integration

The platform uses PagSeguro for subscription management:
- Monthly subscription: R$9.90
- Annual subscription: R$89.90 (equivalent to ~R$7.49/month)
- 7-day free trial
- Automatic billing and renewal
- Subscription management (activate, cancel, update)

For detailed payment integration documentation, see [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md).

## Database Models

### User Model
- Authentication (username, email, password)
- Profile information (age, role, preferences)
- Parental controls
- Progress tracking (modules completed, stars earned)
- Subscription status

### Module Model
- Educational content (title, description, age group)
- Quiz questions (multiple choice, true/false)
- Video placeholders
- Badges and rewards
- Difficulty level

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js security headers
- Parental control restrictions

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data

### Folder Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md              # This file
├── PAYMENT_INTEGRATION.md # Payment integration documentation
├── controllers/           # Request handlers
│   ├── moduleController.js
│   ├── userController.js
│   └── paymentController.js
├── models/                # Database models
│   ├── User.js
│   └── Module.js
├── routes/                # API routes
│   ├── modules.js
│   ├── users.js
│   └── payments.js
├── middleware/            # Custom middleware
│   ├── auth.js
│   └── parentalControl.js
└── data/                  # Initial data
    └── modules.json
```

## Testing

To test the API, you can use tools like Postman or curl. For payment testing, use PagSeguro's sandbox environment.

## Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Configure your production database
3. Update the PagSeguro environment to production
4. Ensure webhook URLs are accessible from the internet
5. Set up SSL certificates for HTTPS

## Support

For support with the payment integration, refer to [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md).

## License

This project is licensed under the MIT License.