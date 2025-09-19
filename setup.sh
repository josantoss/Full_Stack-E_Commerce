#!/bin/bash

echo "🚀 Setting up AradaBuy E-commerce Platform..."
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher first."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL v8.0 or higher first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please update .env file with your database credentials before starting the server"
else
    echo "✅ .env file already exists"
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start MySQL database"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000"
echo ""
echo "📚 Check README.md for detailed setup instructions"
