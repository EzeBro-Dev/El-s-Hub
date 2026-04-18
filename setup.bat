@echo off
REM El's Hub - Setup Script for Windows

echo.
echo 🎨 El's Hub Setup
echo ============================
echo.

REM Frontend Setup
echo 📦 Setting up Frontend...
cd frontend
call npm install
echo ✅ Frontend dependencies installed
echo.

REM Backend Setup
echo 🔧 Setting up Backend...
cd ..\backend

REM Create virtual environment
python -m venv venv
echo ✅ Virtual environment created
echo.

echo ⚠️  Next steps:
echo.
echo 1. Activate virtual environment:
echo    venv\Scripts\activate
echo.
echo 2. Install dependencies:
echo    pip install -r requirements.txt
echo.
echo 3. Run migrations:
echo    python manage.py migrate
echo.
echo 4. Create superuser:
echo    python manage.py createsuperuser
echo.

echo 🚀 Setup Complete!
echo.
echo To start development:
echo 1. Frontend: cd frontend && npm run dev
echo 2. Backend: cd backend && python manage.py runserver
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000
echo Admin: http://localhost:8000/admin
pause
