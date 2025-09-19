@echo off
echo 🚀 Setting up AradaBuy E-commerce Platform...
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed
echo.

REM Backend setup
echo 📦 Setting up Backend...
cd backend

if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please update .env file with your database credentials before starting the server
) else (
    echo ✅ .env file already exists
)

echo 📥 Installing backend dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Backend dependencies installed successfully
) else (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

cd ..

REM Frontend setup
echo.
echo 📦 Setting up Frontend...
cd frontend

echo 📥 Installing frontend dependencies...
call npm install

if %errorlevel% equ 0 (
    echo ✅ Frontend dependencies installed successfully
) else (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update backend\.env with your database credentials
echo 2. Start MySQL database
echo 3. Start backend: cd backend ^&^& npm run dev
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 Backend will run on: http://localhost:5000
echo 🌐 Frontend will run on: http://localhost:3000
echo.
echo 📚 Check README.md for detailed setup instructions
pause
