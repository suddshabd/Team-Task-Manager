# Team Task Manager - Complete Application

A full-stack team task management system with authentication, project management, task tracking, and role-based access control.

## 📋 Project Overview

Team Task Manager is a web application that helps teams collaborate on projects by:
- Creating and organizing projects
- Managing team members
- Creating and tracking tasks
- Monitoring progress with dashboards and statistics
- Using role-based permissions (Admin/Member)

## 🚀 Features

### ✅ Authentication & Authorization
- User registration and login
- JWT token-based authentication
- Role-based access control (Admin/Member)
- Secure password hashing

### ✅ Project Management
- Create projects
- Add team members to projects
- Manage project roles
- Track project ownership

### ✅ Task Management
- Create, read, update, delete tasks
- Priority levels (Low, Medium, High)
- Status tracking (To Do, In Progress, Done)
- Task assignment
- Due date tracking
- Task comments support (backend ready)

### ✅ Dashboard & Analytics
- Project overview
- Task statistics
- Status distribution
- Overdue task tracking
- High-priority task identification

### ✅ User Interface
- Clean, modern UI
- Responsive design
- Intuitive navigation
- Real-time updates

## 🏗️ Architecture

### Backend Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt

### Frontend Stack
- **Framework**: React 18
- **Language**: JavaScript
- **Bundler**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## 📁 Directory Structure

```
Team Task Manager/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Shared constants and model helpers
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth, error handling
│   │   ├── database/         # DB connection and migrations
│   │   ├── utils/            # Helper functions
│   │   └── index.js          # Server entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API integration
│   │   ├── context/          # State management
│   │   ├── styles/           # CSS modules
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB connection details

# Start server
npm run dev
```

Server runs on: `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Application opens at: `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup      - Register user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (auth required)
```

### Projects
```
POST   /api/projects                    - Create project
GET    /api/projects                    - List user's projects
GET    /api/projects/:projectId         - Get project details
POST   /api/projects/:projectId/members - Add team member
GET    /api/projects/:projectId/members - Get team members
```

### Tasks
```
POST   /api/tasks/projects/:projectId/tasks    - Create task
GET    /api/tasks/projects/:projectId/tasks    - List tasks
PUT    /api/tasks/:taskId                      - Update task
DELETE /api/tasks/:taskId                      - Delete task
GET    /api/tasks/projects/:projectId/stats    - Get statistics
```

## 💾 Database Schema

### Users
- UUID ID, username, email, password_hash
- First/last name, role (admin/member)
- Timestamps (created_at, updated_at)

### Projects
- UUID ID, name, description
- created_by (FK to users), timestamps

### Tasks
- UUID ID, title, description
- Status (todo/in_progress/done)
- Priority (low/medium/high)
- assigned_to, created_by (FK to users)
- due_date, timestamps

### Project Members
- UUID ID, project_id, user_id
- Role (admin/member), joined_at

## 🔐 Security Features

✅ **Password Security**
- Bcrypt hashing with 10 salt rounds
- Minimum 8 characters required
- Must include uppercase, lowercase, and numbers

✅ **Authentication**
- JWT tokens with 7-day expiry
- Automatic token validation on requests
- Secure token storage in localStorage

✅ **Authorization**
- Role-based access control
- Project-level permissions
- Task-level validation

✅ **Data Validation**
- Email format validation
- Password strength requirements
- Input sanitization

## 🛠️ Development

### Backend Development

```bash
cd backend

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Database migration
npm run db:migrate
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📊 Task Status Flow

```
┌─────────────────────────────────────────┐
│            TASK LIFECYCLE               │
├─────────────────────────────────────────┤
│ CREATE → TO DO → IN PROGRESS → DONE    │
│          ↓ (Optional)           ↓      │
│          └─────────────────────→ DONE  │
└─────────────────────────────────────────┘
```

## 📈 Task Statistics

Dashboard provides real-time stats:
- Total tasks count
- Task breakdown by status
- Overdue task count
- High priority task count

## 🧪 Testing the Application

### Test Account Creation
1. Go to `http://localhost:3000/signup`
2. Fill in details:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `TestPassword123`
   - Name: Your name

### Test Project Creation
1. Login to dashboard
2. Click "New Project"
3. Enter project details
4. Click "Create Project"

### Test Task Management
1. Open a project
2. Click "New Task"
3. Fill task details
4. Update status using dropdown

## 🎨 UI/UX Features

- **Responsive Design** - Works on mobile, tablet, desktop
- **Color Coding** - Status and priority visual indicators
- **Loading States** - User feedback during operations
- **Error Messages** - Clear error communication
- **Accessibility** - Proper labels and keyboard navigation

## 📚 Key Technologies Explained

### Tailwind CSS
- Utility-first styling directly in components
- Fast iteration without separate component-scoped CSS files
- Responsive and stateful UI patterns stay close to the markup

### JWT (JSON Web Tokens)
- Stateless authentication
- Token contains user information
- No need to query user on every request

### MongoDB
- Document database with flexible schema design
- Natural fit for embedded project members and referenced tasks
- Mongoose adds validation and model-level structure

### Vite
- Lightning-fast bundler
- HMR (Hot Module Replacement)
- Optimized production builds

## 🔧 Configuration Files

### Backend
- `.env.example` - Environment template
- `package.json` - Dependencies and scripts

### Frontend
- `vite.config.js` - Vite bundler config
- `src/index.css` - Tailwind CSS entry file
- `package.json` - Dependencies and scripts

## 📝 Important Notes

- Default admin role is not automatically assigned
- First user of a project becomes admin
- Tasks inherit project member permissions
- All timestamps are UTC
- Token expiry is 7 days (configurable)

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
# Verify .env file has correct MONGODB_URI
# Check port 5000 is not in use
```

### Frontend not connecting to API
```bash
# Ensure backend is running on port 5000
# Check browser console for CORS errors
# Verify API_BASE_URL in frontend/src/services/api.js
```

### Database connection error
```bash
# Verify MONGODB_URI in .env
# Ensure MongoDB is reachable
# Check MongoDB service is running
```

## 📖 Additional Resources

- [Backend README](./backend/README.md) - Detailed backend setup
- [Frontend README](./frontend/README.md) - Detailed frontend setup
- Tailwind CSS: https://tailwindcss.com/
- React: https://react.dev/
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/

## 🎯 Next Steps

1. Set up both backend and frontend following respective READMEs
2. Create test user accounts
3. Create projects and invite team members
4. Create and manage tasks
5. Monitor progress on dashboard

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Check backend logs
4. Verify all prerequisites are installed

---

**Happy Task Managing! 🚀**
# Team-Task-Manager
