# HRMS Lite

Human Resource Management System with Django and React.

## Links

- GitHub: https://github.com/Neo-Ayush-jha/hrms-lite/
- Frontend: https://neo-hrms-lite.netlify.app/
- Backend API: https://hrms-lite-j7x6.onrender.com/api/

## Overview

Simple HR management system to:
- Manage employee information
- Track attendance
- View reports and dashboard

## Tech Stack

Backend:
- Django 6.0.2
- Django REST Framework 3.16.1
- PostgreSQL
- Gunicorn

Frontend:
- React 19.2.0
- Vite 7.2.4
- Tailwind CSS
- Axios

## Backend Setup

Requirements: Python 3.8+, pip

Steps:
1. cd backend
2. python -m venv venv
3. venv\Scripts\activate (Windows) or source venv/bin/activate (Mac/Linux)
4. pip install -r requirements.txt
5. Create .env file:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///db.sqlite3
   ```
6. python manage.py migrate
7. python manage.py runserver

Backend: http://localhost:8000

## Frontend Setup

Requirements: Node.js 16+, npm

Steps:
1. cd frontend/frontend
2. npm install
3. npm run dev

Frontend: http://localhost:5173

## Run Both

Terminal 1:
```
cd backend
source venv/bin/activate
python manage.py runserver
```

Terminal 2:
```
cd frontend/frontend
npm run dev
```

Open http://localhost:5173

## API Endpoints

Base: http://localhost:8000/api

Employees:
- GET /employees/
- POST /employees/
- GET /employees/{id}/
- PUT /employees/{id}/
- DELETE /employees/{id}/

Attendance:
- GET /attendance/
- POST /attendance/
- GET /attendance/{id}/
- PUT /attendance/{id}/
- DELETE /attendance/{id}/

## Example

Create Employee:
```
POST /api/employees/
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering"
}
```

Mark Attendance:
```
POST /api/attendance/
{
  "employee": 1,
  "date": "2026-02-07",
  "status": "Present"
}
```

## Database

Employee:
- employee_id (auto)
- full_name
- email
- department

Attendance:
- employee
- date
- status (Present/Absent)

## Version

1.0.0
