# Team Task Manager - Backend API

A comprehensive REST API for team task management with role-based access control, project management, and task tracking.

## Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (Admin/Member)
- Secure password hashing with bcrypt

✅ **Project Management**
- Create and manage projects
- Add team members to projects
- Track project ownership and roles

✅ **Task Management**
- Create, update, and delete tasks
- Task status tracking (To Do, In Progress, Done)
- Priority levels (Low, Medium, High)
- Task assignment and due dates
- Task statistics and analytics

✅ **Database**
- MongoDB with Mongoose models
- Flexible document structure for projects, members, and tasks
- Schema validation at the model layer

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Security**: bcrypt

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- MongoDB running locally or a remote MongoDB URI
- npm or yarn package manager

### Installation

1. **Clone and navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection details:
```
MONGODB_URI=mongodb://127.0.0.1:27017/team-task-manager
MONGODB_DB_NAME=team-task-manager
JWT_SECRET=your_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

4. **Start the server**
```bash
npm run dev
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Projects
- `POST /api/projects` - Create project (requires auth)
- `GET /api/projects` - List user's projects (requires auth)
- `GET /api/projects/:projectId` - Get project details (requires auth)
- `POST /api/projects/:projectId/members` - Add team member (requires auth)
- `GET /api/projects/:projectId/members` - Get team members (requires auth)

### Tasks
- `POST /api/tasks/projects/:projectId/tasks` - Create task (requires auth)
- `GET /api/tasks/projects/:projectId/tasks` - Get tasks (requires auth)
- `PUT /api/tasks/:taskId` - Update task (requires auth)
- `DELETE /api/tasks/:taskId` - Delete task (requires auth)
- `GET /api/tasks/projects/:projectId/stats` - Get task statistics (requires auth)

## Data Model

### Users Collection
- Identity, profile fields, role, and password hash

### Projects Collection
- Project metadata, creator reference, and embedded member roles

### Tasks Collection
- Task content, status, priority, due date, and references to project/users

## Authentication Flow

1. User signs up with email, password, and name
2. Password is hashed with bcrypt (salt rounds: 10)
3. JWT token is generated and returned
4. Token is stored in localStorage on frontend
5. Token is sent in `Authorization: Bearer <token>` header for authenticated requests
6. Token expires after 7 days (configurable)

## Role-Based Access Control

**Admin Users**
- Can see all projects and tasks
- Can manage all users

**Regular Members**
- Can only see projects they're part of
- Can only manage tasks in their projects
- Can be assigned to tasks

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Running in Production

```bash
npm start
```

## Development Notes

- All passwords must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number
- Email validation follows standard RFC format
- Tasks automatically track creation time and last update time
- Overdue tasks are automatically tracked in statistics

---

For frontend setup, see [../frontend/README.md](../frontend/README.md)
