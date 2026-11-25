# Secure Record Storage API

A REST API built using Node.js, Express, MongoDB, and Mongoose.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Create, read, update, and delete notes
- Users can only access their own notes

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register |
| POST | `/api/users/login` | Login |
| GET | `/api/notes` | Get notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## Testing

Test the API using Postman.

Protected routes require a JWT Bearer Token.

## Author

Darshita Vaghela
