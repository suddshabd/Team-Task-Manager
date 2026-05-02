# Team Task Manager - Frontend

A modern React web application for team task management with authentication, project management, and comprehensive task tracking.

## Features

✅ **Authentication**
- User signup and login
- Secure JWT token storage
- Protected routes

✅ **Dashboard**
- Overview of all projects
- Create new projects
- Quick project access

✅ **Project Management**
- View project details
- Manage team members
- Track project progress

✅ **Task Management**
- Create tasks with priority and due dates
- Update task status (To Do, In Progress, Done)
- Filter tasks by status
- View task statistics
- Track task assignments

✅ **User Interface**
- Clean, modern design
- Responsive layout for mobile and desktop
- Intuitive navigation

## Tech Stack

- **Framework**: React 18 with JavaScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Backend server running on `http://localhost:5000`

## Setup Instructions

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Common.jsx       # Common UI components (Button, Card, etc.)
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state management
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   └── ProjectDetail.jsx
│   ├── services/
│   │   └── api.js           # API calls configuration
│   ├── App.jsx              # Main app component
│   ├── index.css            # Tailwind entry stylesheet
│   └── main.jsx             # Entry point
├── package.json
├── index.html
└── vite.config.js
```

## Key Features Explained

### Authentication Context
The `AuthContext` manages:
- User state (login, logout)
- Token storage and validation
- Protected route access
- Current user information

### API Service
The `api.js` file provides:
- Centralized API configuration
- Automatic token injection in requests
- Error handling
- Service methods for auth, projects, and tasks

### Protected Routes
Routes are wrapped with `ProtectedRoute` component which:
- Checks if user is authenticated
- Redirects to login if not authenticated
- Shows loading state while checking auth

## Login Workflow

1. User navigates to `/login`
2. Enters email and password
3. Upon successful login:
   - Token is stored in localStorage
   - User data is saved in context
   - Redirected to dashboard
4. Dashboard displays user's projects

## Creating Projects

1. Click "New Project" button on dashboard
2. Fill project name and optional description
3. Project is created and added to user's projects
4. User automatically becomes admin of the project

## Managing Tasks

1. Open a project from dashboard
2. View project statistics at the top
3. Click "New Task" to create a task
4. Update task status using dropdown
5. Filter tasks by status using the filter control

## Styling

The app now uses Tailwind CSS utility classes for component styling and layout. Key features:

- **Responsive design** - Works across mobile and desktop layouts
- **Consistent spacing** - Shared utility patterns keep the UI cohesive
- **Accessible states** - Focus, hover, and error states live directly in the components
- **Single stylesheet entry** - `src/index.css` loads Tailwind and base layer tweaks

## Environment Variables

No environment variables needed by default. The app assumes:
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`

To change backend URL, modify the `API_BASE_URL` in `src/services/api.js`

## API Integration

### Example API Call

```js
// Import service
import { projectService } from '../services/api';

// Use in component
const response = await projectService.getProjects();
const projects = response.data.data;
```

### Error Handling

All API calls should be wrapped in try-catch:

```js
try {
  const response = await projectService.createProject(data);
  // Handle success
} catch (error) {
  const errorMsg = error.response?.data?.error || 'An error occurred';
  setError(errorMsg);
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Assets are automatically code-split by Vite
- Images should be optimized before adding
- API calls are debounced where appropriate
- State updates are batched to minimize re-renders

## Troubleshooting

### "Cannot reach backend"
- Ensure backend server is running on port 5000
- Check `.env` file in backend matches your setup
- Verify CORS is enabled in backend

### "Login not working"
- Clear localStorage and try again
- Check browser console for errors
- Verify backend is running

### "Styles not loading"
- Clear browser cache
- Restart dev server with `npm run dev`
- Check CSS Module imports

## Development Tips

- Use React DevTools extension for debugging
- Check browser console for errors
- Use Network tab to debug API calls
- Use Elements tab to inspect CSS

---

For backend setup, see [../backend/README.md](../backend/README.md)
