# Team Task Manager - API Documentation

Complete REST API reference with examples.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except `/auth/signup` and `/auth/login` require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Authentication Endpoints

### `POST /auth/signup` - Register a new user

Create a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `POST /auth/login` - User login

Authenticate user with email and password.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### `GET /auth/me` - Get current user

Retrieve authenticated user's profile.

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "member",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📁 Project Endpoints

### `POST /projects` - Create a new project

Create a project (user becomes admin).

**Request:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Website Redesign",
    "description": "Redesign company website for better UX"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Website Redesign",
    "description": "Redesign company website for better UX",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### `GET /projects` - List all projects

Get projects accessible to current user.

**Request:**
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Website Redesign",
      "description": "Redesign company website for better UX",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440002",
      "name": "Mobile App",
      "description": "Build new mobile application",
      "created_by": "550e8400-e29b-41d4-a716-446655440001",
      "created_at": "2024-01-14T09:00:00Z",
      "updated_at": "2024-01-14T09:00:00Z"
    }
  ]
}
```

---

### `GET /projects/:projectId` - Get project details

Retrieve detailed information about a specific project.

**Request:**
```bash
curl -X GET http://localhost:5000/api/projects/660e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Website Redesign",
    "description": "Redesign company website for better UX",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### `POST /projects/:projectId/members` - Add project member

Add a user to a project team.

**Request:**
```bash
curl -X POST http://localhost:5000/api/projects/660e8400-e29b-41d4-a716-446655440001/members \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "role": "member"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Member added successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440001",
    "project_id": "660e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440001",
    "role": "member",
    "joined_at": "2024-01-15T11:00:00Z"
  }
}
```

---

### `GET /projects/:projectId/members` - Get project members

List all members of a project team.

**Request:**
```bash
curl -X GET http://localhost:5000/api/projects/660e8400-e29b-41d4-a716-446655440001/members \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "johndoe",
      "email": "john@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "role": "admin",
      "joined_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "username": "janedoe",
      "email": "jane@example.com",
      "first_name": "Jane",
      "last_name": "Doe",
      "role": "member",
      "joined_at": "2024-01-15T11:00:00Z"
    }
  ]
}
```

---

## ✅ Task Endpoints

### `POST /tasks/projects/:projectId/tasks` - Create a task

Create a new task in a project.

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks/projects/660e8400-e29b-41d4-a716-446655440001/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design homepage mockups",
    "description": "Create high-fidelity mockups for the homepage",
    "priority": "high",
    "dueDate": "2024-01-20",
    "assignedTo": "550e8400-e29b-41d4-a716-446655440001"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440001",
    "project_id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Design homepage mockups",
    "description": "Create high-fidelity mockups for the homepage",
    "status": "todo",
    "priority": "high",
    "assigned_to": "550e8400-e29b-41d4-a716-446655440001",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "due_date": "2024-01-20",
    "created_at": "2024-01-15T12:00:00Z",
    "updated_at": "2024-01-15T12:00:00Z"
  }
}
```

---

### `GET /tasks/projects/:projectId/tasks` - Get tasks

List all tasks in a project (with optional filters).

**Request:**
```bash
# Get all tasks
curl -X GET http://localhost:5000/api/tasks/projects/660e8400-e29b-41d4-a716-446655440001/tasks \
  -H "Authorization: Bearer <token>"

# Get only "in_progress" tasks
curl -X GET "http://localhost:5000/api/tasks/projects/660e8400-e29b-41d4-a716-446655440001/tasks?status=in_progress" \
  -H "Authorization: Bearer <token>"

# Get tasks assigned to specific user
curl -X GET "http://localhost:5000/api/tasks/projects/660e8400-e29b-41d4-a716-446655440001/tasks?assignedTo=550e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440001",
      "project_id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Design homepage mockups",
      "description": "Create high-fidelity mockups for the homepage",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": "550e8400-e29b-41d4-a716-446655440001",
      "assigned_to_username": "janedoe",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_by_username": "johndoe",
      "due_date": "2024-01-20",
      "created_at": "2024-01-15T12:00:00Z",
      "updated_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

---

### `PUT /tasks/:taskId` - Update a task

Update task details (status, priority, assignment, etc.).

**Request:**
```bash
curl -X PUT http://localhost:5000/api/tasks/880e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done",
    "priority": "medium"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440001",
    "project_id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Design homepage mockups",
    "description": "Create high-fidelity mockups for the homepage",
    "status": "done",
    "priority": "medium",
    "assigned_to": "550e8400-e29b-41d4-a716-446655440001",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "due_date": "2024-01-20",
    "created_at": "2024-01-15T12:00:00Z",
    "updated_at": "2024-01-15T15:00:00Z"
  }
}
```

---

### `DELETE /tasks/:taskId` - Delete a task

Remove a task from a project.

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/880e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### `GET /tasks/projects/:projectId/stats` - Get task statistics

Get dashboard statistics for a project.

**Request:**
```bash
curl -X GET http://localhost:5000/api/tasks/projects/660e8400-e29b-41d4-a716-446655440001/stats \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_tasks": 15,
    "todo_tasks": 5,
    "in_progress_tasks": 7,
    "done_tasks": 3,
    "overdue_tasks": 2,
    "high_priority_tasks": 4
  }
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "error": "Access token required"
}
```

### Forbidden (403)
```json
{
  "error": "Insufficient permissions"
}
```

### Bad Request (400)
```json
{
  "error": "Description of what went wrong"
}
```

### Not Found (404)
```json
{
  "error": "Resource not found"
}
```

### Server Error (500)
```json
{
  "error": "Internal server error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Client error |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Authentication required |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Testing with cURL

Save a bearer token:
```bash
TOKEN="your_jwt_token_here"
```

Use in requests:
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

---

## Testing with Postman

1. Import APIs into Postman
2. Create a variable for `token`:
   - Set initial value from login response
   - Use `{{token}}` in Authorization header
3. Create collections for Auth, Projects, Tasks
4. Save requests for reuse

---

## Useful Query Filters

### Filter tasks by multiple criteria
```bash
# Tasks marked as "todo" 
?status=todo

# High priority tasks
?priority=high

# Tasks assigned to user
?assignedTo={userId}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- Implementing rate limiting middleware
- Throttling API requests
- Adding caching headers

---

For more details, see [Backend README](./backend/README.md)
