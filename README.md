# LearnGami - Plataforma de Gestão de Cursos de Origami

Frontend application for the LearnGami challenge built with Next.js 16, React 19, TypeScript, and TailwindCSS.

## 🎯 Challenge Overview

This application is a full-stack web platform for learning origami, featuring user authentication and course management. The frontend provides a responsive, user-friendly interface with role-based access control.

### Key Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Course Management**: Full CRUD operations for courses (admin only)
- **Lesson Management**: Create and manage lessons associated with courses
- **Public Catalog**: Browse active courses without authentication
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Role-Based Access**: Distinct experiences for administrators and regular users

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd algoritmo-humano-front
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
```bash
npm run dev
```
Runs the app in development mode at http://localhost:3000

#### Production Build
```bash
npm run build
```
Creates an optimized production build

#### Production Server
```bash
npm run start
```
Starts the production server

#### Testing
```bash
npm run test
```
Runs the test suite with Jest

#### Linting
```bash
npm run lint
```
Checks for code quality issues

### Environment Variables

The application connects to the backend API at `http://localhost:3001/api`. No additional environment variables are required for basic operation.

## 🏗️ Architecture & Structure

### Project Structure
```
app/
├── components/         # Reusable UI components
├── conta/              # User account page
├── curso/[id]/         # Course detail page
├── dashboard/          # Admin dashboard
├── login/              # Authentication login page
├── registro/           # User registration page
├── services/           # API service layer
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── UserContext.tsx     # Authentication context provider
├── layout.tsx          # Root layout component
├── page.tsx            # Homepage
└── ...
```

### Core Technologies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Bootstrap Icons**: Icon library
- **Jest**: Testing framework

### Component Architecture

The application follows a component-based architecture with reusable UI elements:

- **Layout Components**: Header, Footer, AuthLayout
- **Form Components**: Input, PasswordInput, Button
- **Data Display**: CourseCard, LessonCard, CourseList
- **Navigation**: Pagination
- **Utility**: Modal, ProtectedRoute

### State Management

- **React Context API**: Used for global user authentication state
- **Local Component State**: useState and useEffect for component-specific state

### Routing

The application uses Next.js App Router with the following routes:

| Path | Description | Authentication |
|------|-------------|---------------|
| `/` | Homepage with public course catalog | None |
| `/login` | User login page | None |
| `/registro` | User registration page | None |
| `/conta` | User account management | Required |
| `/dashboard` | Admin dashboard | Admin Required |
| `/curso/[id]` | Course details and lessons | Required |

## 🔐 Authentication System

### JWT Implementation

- Authentication is handled via JWT tokens
- Tokens are stored in HTTP-only cookies for security
- Token validation occurs on both client and server sides
- Automatic redirection for protected routes

### User Roles

- **USER**: Can browse public courses and access enrolled content
- **ADMIN**: Has all USER permissions plus course/lesson management capabilities

### Authentication Flow

1. User submits credentials via login/registration form
2. Backend validates and returns JWT token
3. Token is stored securely in cookie
4. User context is updated throughout the application
5. Protected routes check authentication status before rendering

## 📚 Course Management

### Course Structure

Each course contains:

- Title
- Description
- Duration (in minutes)
- Image URL (optional)
- Status (active/inactive)
- Creation date

### CRUD Operations (Admin Only)

- **Create**: Add new courses via dashboard form
- **Read**: View all courses in dashboard
- **Update**: Edit existing course details
- **Delete**: Remove courses from the system

### Public Course Catalog

- Displays only active courses
- Search functionality by title
- Pagination for improved performance
- Responsive grid layout

## 🎓 Lesson Management

### Lesson Structure

Each lesson contains:

- Name/title
- Description
- Cover image (optional)
- Video URL
- Status (active/inactive)
- Associated course ID

### Features

- Admins can create/edit/delete lessons
- Lessons are grouped by course
- Video playback interface
- Lesson navigation within course

## 🧪 Testing

The application includes unit tests using Jest and React Testing Library:

```bash
npm run test
```

Tests cover:
- Component rendering
- Form validation
- Service functions
- Utility functions

## 🛠️ Development Process

### AI Assistance

AI tools were used during development for:

- Creating editable code snippets for visual and logical components
- Identifying and fixing errors
- Code review to ensure professionalism
- Accelerating development timeline

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Consistent component structure
- Reusable UI components
- Clear separation of concerns

## 🌐 API Integration

### Authentication Endpoints

- **Register**: `POST /auth/register`
- **Login**: `POST /auth/login`
- **User Info**: `GET /auth/me`
- **User Count**: `GET /auth/count` (admin only)

### Course Endpoints

- **Create Course**: `POST /courses/` (authenticated)
- **Get All Courses**: `GET /courses/` (authenticated)
- **Get Course by ID**: `GET /courses/:id` (authenticated)
- **Update Course**: `PUT /courses/:id` (authenticated)
- **Delete Course**: `DELETE /courses/:id` (authenticated)
- **Get Public Courses**: `GET /courses/public` (no authentication required)
- **Get Public Course**: `GET /courses/public/:id` (no authentication required)

### Lesson Endpoints

- **Create Lesson**: `POST /lessons/` (authenticated)
- **Get Lessons by Course**: `GET /lessons/course/:id` (authenticated)
- **Get Lesson by ID**: `GET /lessons/:id` (authenticated)
- **Update Lesson**: `PUT /lessons/:id` (authenticated)
- **Delete Lesson**: `DELETE /lessons/:id` (authenticated)
- **Get Public Lessons**: `GET /lessons/public/course/:id` (no authentication required)

### Service Layer

The application uses a service-oriented approach to API integration:

1. `api.ts` - Generic API request handler with error handling
2. `authService.ts` - Authentication functions (register, login, logout, user data)
3. `courseService.ts` - Course management functions
4. `lessonService.ts` - Lesson management functions

## 📈 Performance Considerations

- Pagination for course and lesson lists
- Memoization for filtered data
- Lazy loading for images
- Efficient component re-rendering
- Client-side caching of user data

## 🚨 Error Handling

- Comprehensive error boundaries
- User-friendly error messages
- Graceful degradation for API failures
- Form validation and error display

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly navigation
- Adaptive component sizing
- Cross-browser compatibility

## 📝 Notes

- The application follows professional development standards
- Clean commit history with descriptive messages
- Well-documented components and services
- Consistent code style and formatting

## 🚀 Future Enhancements

Potential improvements that could be made:

- Real image uploading instead of URL input
- Advanced filtering and sorting options
- User progress tracking
- Bookmarking favorite courses
- Social sharing features
- Dark mode support
- Enhanced accessibility features

---

*This documentation was generated as part of the LearnGami technical challenge.*