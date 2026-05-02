# Team Task Manager - Project Structure

Complete project layout with descriptions of all directories and files.

```
Team Task Manager/
│
├── README.md                      # Main project overview
├── QUICKSTART.md                  # Quick setup guide (START HERE)
├── API.md                         # Complete API documentation
├── BUILD_SUMMARY.md               # What was built
├── .gitignore                     # Git ignore rules
│
├── backend/                       # ⚙️ REST API Server
│   ├── src/
│   │   ├── index.js              # Express server entry point
│   │   │
│   │   ├── controllers/          # Business logic
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   │
│   │   ├── routes/               # API route definitions
│   │   │   ├── authRoutes.js     # /api/auth routes
│   │   │   ├── projectRoutes.js  # /api/projects routes
│   │   │   └── taskRoutes.js     # /api/tasks routes
│   │   │
│   │   ├── middleware/           # Express middleware
│   │   │   └── auth.js           # JWT validation & role check
│   │   │
│   │   ├── database/             # Database connection & schema
│   │   │   ├── db.js             # PostgreSQL pool connection
│   │   │   └── migrate.js        # Create tables & schema
│   │   │
│   │   ├── models/               # Shared constants and model helpers
│   │   │   └── types.js          # Role/status/priority constants
│   │   │
│   │   └── utils/                # Helper functions
│   │       ├── auth.js           # JWT & bcrypt utilities
│   │       └── helpers.js        # Response & validation helpers
│   │
│   ├── package.json              # Dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── .env.example              # Environment template
│   ├── .gitignore
│   └── README.md                 # Backend documentation
│
├── frontend/                      # 🎨 React Web Application
│   ├── public/
│   │   └── index.html            # HTML entry point
│   │
│   ├── src/
│   │   ├── main.jsx              # React root
│   │   ├── App.jsx               # App component with routing
│   │   ├── App.css               # Global styles
│   │   │
│   │   ├── pages/                # Page/route components
│   │   │   ├── Login.jsx         # /login
│   │   │   ├── Signup.jsx        # /signup
│   │   │   ├── Dashboard.jsx     # /dashboard (projects list)
│   │   │   └── ProjectDetail.jsx # /projects/:id (tasks view)
│   │   │
│   │   ├── components/           # Reusable components
│   │   │   ├── Common.jsx        # Button, Card, FormInput
│   │   │   └── ProtectedRoute.jsx # Route guard HOC
│   │   │
│   │   ├── context/              # State management
│   │   │   └── AuthContext.jsx   # Auth state & methods
│   │   │
│   │   ├── services/             # API integration
│   │   │   └── api.js            # Axios client & endpoints
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   │   └── (ready for expansion)
│   │   │
│   │   └── styles/               # CSS Modules
│   │       ├── Auth.module.css
│   │       ├── Dashboard.module.css
│   │       └── ProjectDetail.module.css
│   │
│   ├── package.json              # Dependencies
│   ├── index.html                # HTML entry point
│   ├── vite.config.js            # Vite configuration
│   ├── .gitignore
│   └── README.md                 # Frontend documentation
│
└── 📊 Database Schema (PostgreSQL)
    ├── users
    │   ├── id (UUID)
    │   ├── username
    │   ├── email
    │   ├── password_hash
    │   ├── first_name
    │   ├── last_name
    │   ├── role (admin/member)
    │   ├── created_at
    │   └── updated_at
    │
    ├── projects
    │   ├── id (UUID)
    │   ├── name
    │   ├── description
    │   ├── created_by (FK → users)
    │   ├── created_at
    │   └── updated_at
    │
    ├── tasks
    │   ├── id (UUID)
    │   ├── project_id (FK → projects)
    │   ├── title
    │   ├── description
    │   ├── status (todo/in_progress/done)
    │   ├── priority (low/medium/high)
    │   ├── assigned_to (FK → users, nullable)
    │   ├── created_by (FK → users)
    │   ├── due_date
    │   ├── created_at
    │   └── updated_at
    │
    ├── project_members
    │   ├── id (UUID)
    │   ├── project_id (FK → projects)
    │   ├── user_id (FK → users)
    │   ├── role (admin/member)
    │   └── joined_at
    │
    └── task_comments (ready for implementation)
        ├── id (UUID)
        ├── task_id (FK → tasks)
        ├── user_id (FK → users)
        ├── comment
        ├── created_at
        └── updated_at
```

## 🔌 API Endpoints Structure

```
/api
├── /auth
│   ├── POST   /signup       → Create account
│   ├── POST   /login        → Login user
│   └── GET    /me           → Get current user
│
├── /projects
│   ├── POST   /             → Create project
│   ├── GET    /             → List projects
│   ├── GET    /:projectId   → Get project details
│   ├── POST   /:projectId/members    → Add member
│   └── GET    /:projectId/members    → List members
│
└── /tasks
    ├── POST   /projects/:projectId/tasks      → Create task
    ├── GET    /projects/:projectId/tasks      → List tasks
    ├── PUT    /:taskId                        → Update task
    ├── DELETE /:taskId                        → Delete task
    └── GET    /projects/:projectId/stats      → Get statistics
```

## 🔄 Application Flow

```
User Action              Component          Service              API              Database
─────────────────────────────────────────────────────────────────────────────────
1. Open app
   │
   └─→ Login/              Auth Context
       Signup              Check token
       │
       └─→ Submit form ──→ authService ──→ POST /auth/signup ──→ Insert user
                                               │
                                               └─→ Return token
                                                   │
                                                   └─→ Save to storage
                                                       │
                                                       └─→ Dashboard

2. View projects
   │
   └─→ Dashboard ────────→ projectService ──→ GET /projects ──→ Query user's projects
                                                                 │
                                                                 └─→ Return data

3. Create project
   │
   └─→ New Project Form  ──→ projectService ──→ POST /projects ──→ Insert project
                                                                    │
                                                                    └─→ Add user as admin

4. View tasks
   │
   └─→ ProjectDetail ───────→ taskService ──→ GET /tasks ──→ Query tasks
                                                             │
                                                             └─→ Return with stats

5. Create task
   │
   └─→ New Task Form ──────→ taskService ──→ POST /tasks ──→ Insert task
                                                             │
                                                             └─→ Return created task

6. Update task
   │
   └─→ Status Dropdown ──→ taskService ──→ PUT /tasks/:id ──→ Update status
                                                                │
                                                                └─→ Return updated task
```

## 🎯 URL Routing

```
Frontend Routes:
└── http://localhost:3000
    ├── /login                      → Login page
    ├── /signup                     → Signup page
    ├── /dashboard                  → Projects list
    ├── /projects/:projectId        → Project detail + tasks
    └── (Protected routes require authentication)

Backend Routes:
└── http://localhost:5000/api
    ├── /health                     → Health check
    ├── /auth/*                     → Authentication
    ├── /projects/*                 → Project management
    └── /tasks/*                    → Task management
    
Database:
└── PostgreSQL
    ├── Host: localhost
    ├── Port: 5432
    ├── Database: task_manager_db
    └── (Credentials from .env)
```

## 📦 Key Directories Explained

### backend/src/controllers/
- Business logic for each feature
- Handles requests and responses
- Validates data
- Communicates with database

### backend/src/routes/
- Defines API endpoints
- Maps HTTP methods to controllers
- Applies middleware (auth, validation)

### backend/src/middleware/
- auth.ts: JWT validation and role checking
- Applied to protected routes

### backend/src/database/
- db.ts: Connection pool to PostgreSQL
- migrate.ts: Schema creation and setup

### frontend/src/pages/
- Full-page components
- Mapped to routes
- Combine multiple components

### frontend/src/components/
- Reusable UI building blocks
- Stateless or simple state
- Imported by pages

### frontend/src/context/
- React context for global state
- AuthContext manages: user, token, auth methods

### frontend/src/services/
- Axios client configuration
- API endpoint functions
- Error handling

## 🔐 Authentication Flow

```
1. User enters credentials → Signup/Login form
                             │
2. Form validates inputs → FormInput component
                           │
3. Submit to backend → authService.signup/login
                       │
4. Backend hashes password (bcrypt) and creates user
                                     │
5. Return JWT token & user data → Frontend
                                  │
6. Save token to localStorage → Persistent login
                                 │
7. Add token to API requests → Axios interceptor
                                │
8. Backend validates → middleware/auth.ts
                       │
9. Access granted/denied → Response to frontend
```

## 📁 File Naming Conventions

```
typescript files:          camelCase.ts
components:                PascalCase.tsx
pages:                      PascalCase.tsx
CSS modules:                camelCase.module.css
utilities:                  camelCase.ts
database files:             dbDescription.ts
API routes:                 resourceRoutes.ts
API controllers:            resourceController.ts
```

## 🚀 Build Pipeline

```
Backend:
src/ (TypeScript)
  ↓ (npm run dev or npm run build)
  ↓ (tsc compiler)
dist/ (JavaScript)
  ↓ (npm start or node dist/index.js)
  ↓
Running Express server on port 5000

Frontend:
src/ (React + TypeScript)
  ↓ (npm run dev or npm run build)
  ↓ (Vite bundler)
dist/ (Optimized JavaScript)
  ↓ (npm run preview or deploy to hosting)
  ↓
Running React app on port 3000
```

## 🔗 Relationships

```
User
  ├─ 1 ──→ N Projects (created_by)
  ├─ 1 ──→ N Project Members
  ├─ 1 ──→ N Tasks (created_by)
  └─ 1 ──→ N Tasks (assigned_to)

Project
  ├─ 1 ──→ N Tasks
  ├─ 1 ──→ N Project Members
  └─ 1 ──→ 1 User (creator)

Task
  ├─ N ──→ 1 Project
  ├─ 1 ──→ 1 User (creator)
  └─ 1 ──→ 1 User (assignee, optional)

Project Member
  ├─ N ──→ 1 Project
  └─ N ──→ 1 User
```

## 📊 Data Flow

```
Request Entry:
Browser
    ↓
React Component
    ↓
Service (API call)
    ↓
Axios (with token)
    ↓
Express Server
    ↓
Middleware (auth check)
    ↓
Route Handler
    ↓
Controller (business logic)
    ↓
Database Query
    ↓
Response
    ↓
Frontend Display
```

---

This structure provides:
- ✅ Clear separation of concerns
- ✅ Scalable architecture
- ✅ Easy to add new features
- ✅ Type safety with TypeScript
- ✅ Security with authentication
- ✅ Professional code organization
