# Algoritmo Humano Frontend

Frontend application for the LearnGami challenge built with Next.js.

## API Integration

The frontend is connected to the backend API running on `http://localhost:3001/api`.

### Authentication

- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`

### Courses

- **Create Course**: `POST /courses/` (authenticated)
- **Get All Courses**: `GET /courses/` (authenticated)
- **Get Course by ID**: `GET /courses/:id` (authenticated)
- **Update Course**: `PUT /courses/:id` (authenticated)
- **Delete Course**: `DELETE /courses/:id` (authenticated)
- **Get Public Courses**: `GET /courses/public` (no authentication required)

## Services

The application uses service files to communicate with the backend:

1. `api.ts` - Generic API request handler
2. `authService.ts` - Authentication related functions (register, login, logout)
3. `courseService.ts` - Course related functions (create, read, update, delete)

## Authentication Flow

1. User registers or logs in through the respective forms
2. Upon successful authentication, a JWT token is received and stored in localStorage
3. The token is automatically included in the Authorization header for all subsequent authenticated requests
4. User context is managed through React Context API to maintain authentication state across the application

## Local Storage

- `token` - JWT token for authenticated requests