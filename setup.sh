#!/bin/bash

# El's Hub - Setup Script

echo "🎨 El's Hub Setup"
echo "============================"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Backend Setup
echo "🔧 Setting up Backend..."
cd ../backend

# Create virtual environment
python -m venv venv
echo "✅ Virtual environment created"

# Activate virtual environment (requires manual activation on Windows)
echo "⚠️  Please activate the virtual environment:"
echo "   Windows: venv\\Scripts\\activate"
echo "   Mac/Linux: source venv/bin/activate"
echo ""
echo "Then run:"
echo "   pip install -r requirements.txt"
echo "   python manage.py migrate"
echo "   python manage.py createsuperuser"
echo ""

echo "🚀 Setup Complete!"
echo ""
echo "To start development:"
echo "1. Frontend: cd frontend && npm run dev"
echo "2. Backend: cd backend && python manage.py runserver"
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8000"
echo "Admin: http://localhost:8000/admin"
