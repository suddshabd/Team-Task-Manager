# Team Task Manager - Quick Start Guide

Get up and running with Team Task Manager in less than 10 minutes!

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 16+ (`node --version`)
- ✅ npm/yarn package manager (`npm --version`)
- ✅ PostgreSQL installed and running

## 🚀 Installation & Setup

### Step 1: Setup PostgreSQL Database

```bash
# Create the database
createdb task_manager_db

# Verify it was created
psql -l | grep task_manager_db
```

### Step 2: Backend Setup (Terminal Window 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your PostgreSQL credentials if needed
# Mac/Linux:
nano .env
# Windows:
notepad .env

# Start backend server
npm run dev
```

✅ Backend should now be running on `http://localhost:5000`

**Success indicators:**
- See "✓ Server running on http://localhost:5000"
- See "✓ Database connected successfully"
- See "✓ Tables created successfully"

### Step 3: Frontend Setup (Terminal Window 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend will automatically open at `http://localhost:3000`

## 🎮 First Time Using the App

### 1. Create Your Account

1. You'll see the signup page
2. Fill in your details:
   - **Username**: Choose a unique username
   - **Email**: Your email address
   - **Password**: Must have uppercase, lowercase, and numbers (e.g., `MyPassword123`)
   - **First Name**: Your first name
   - **Last Name**: Your last name
3. Click "Sign Up"
4. You're automatically logged in! 🎉

### 2. Create Your First Project

1. On the dashboard, click **"+ New Project"**
2. Enter:
   - **Project Name**: e.g., "My Awesome Project"
   - **Description**: Optional project description
3. Click **"Create Project"**
4. Your project appears on the dashboard

### 3. Create Your First Task

1. Click **"Open Project"** on your project card
2. Click **"+ New Task"**
3. Fill in:
   - **Task Title**: e.g., "Setup database"
   - **Description**: Optional description
   - **Priority**: Select Low/Medium/High
   - **Due Date**: Optional date
4. Click **"Create Task"**
5. Your task appears in the table

### 4. Update Task Status

1. In the tasks table, click the status dropdown
2. Change from "To Do" → "In Progress" → "Done"
3. Status updates immediately!

## 📊 Explore Features

### Dashboard Features
- **View all your projects** - See projects you created or joined
- **Project statistics** - View task counts and status breakdown
- **Filter tasks** - Sort by status to focus on what needs attention
- **Create projects** - Start new projects anytime

### Project Features
- **Task overview** - See all tasks at a glance
- **Statistics** - Dashboard showing:
  - Total tasks
  - Tasks by status
  - Overdue tasks (if any)
  - High priority tasks
- **Filter & search** - Narrow down tasks by status

## 🔑 Important Passwords Tips

Your password must meet these requirements:
- **Minimum 8 characters**
- **At least 1 uppercase letter** (A-Z)
- **At least 1 lowercase letter** (a-z)
- **At least 1 number** (0-9)

✅ Examples of valid passwords:
- `Task123Manager`
- `SecurePass999`
- `MyProject456`

❌ Examples of invalid passwords:
- `password123` (no uppercase)
- `PASSWORD123` (no lowercase)
- `Password` (no number)

## 🆘 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
# macOS/Linux:
psql -U postgres -c "SELECT 1;"

# If error, install PostgreSQL from:
# https://www.postgresql.org/download/
```

### "Port 5000 already in use"
```bash
# Find the process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### "Port 3000 already in use"
```bash
# Find the process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### "Frontend can't reach backend"
- ✅ Ensure backend is running (check Terminal 1)
- ✅ Ensure frontend is running (check Terminal 2)
- ✅ Check both are on correct ports (5000 and 3000)
- ✅ Try refreshing browser

### "Login not working"
- ✅ Check your password meets requirements (8+ chars, uppercase, lowercase, number)
- ✅ Clear browser cache and try again
- ✅ Check browser console for errors (F12)

### "Can't create project"
- ✅ Make sure you're logged in
- ✅ Check backend terminal for errors
- ✅ Try refreshing the page

## 📱 Testing Checklist

- [ ] Sign up and login works
- [ ] Can see dashboard
- [ ] Can create a project
- [ ] Can open a project
- [ ] Can see task statistics
- [ ] Can create a task
- [ ] Can update task status
- [ ] Can logout

## 🎯 Next Steps

Once everything is working:

1. **Create multiple projects** - Test project management
2. **Invite team members** - (Backend API supports project members)
3. **Create various tasks** - Test different priorities and statuses
4. **Track progress** - Use dashboard to monitor
5. **Try filtering** - Filter tasks by status

## 💡 Pro Tips

- 📌 Use meaningful project names
- 🎯 Set priorities correctly (High for urgent, Low for backlog)
- 📅 Use due dates to track deadlines
- 🎨 Monitor dashboard for bottlenecks
- 👥 Invite team members to projects (admin feature)

## 📚 Full Documentation

For detailed info, see:
- [Main README](./README.md) - Complete overview
- [Backend README](./backend/README.md) - API documentation
- [Frontend README](./frontend/README.md) - Frontend setup details

## 🎓 Understanding the App Structure

```
Browser (Frontend)
    ↓
React App (localhost:3000)
    ↓↑ (HTTP Requests/Responses)
Express API (localhost:5000)
    ↓↑ (SQL Queries)
PostgreSQL Database
```

## 🚀 You're All Set!

Your task management system is ready to use! 🎉

Start by:
1. ✅ Creating a project
2. ✅ Adding tasks
3. ✅ Tracking progress

Happy task managing! 📋
