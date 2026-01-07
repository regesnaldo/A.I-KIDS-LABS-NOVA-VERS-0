@echo off
echo ===================================================
echo   A.I. KIDS LABS - FULL STACK LAUNCHER
echo ===================================================

echo [1/2] Starting Backend Server (Port 5001)...
start "AI-KIDS-BACKEND" cmd /k "cd backend && npm install && npm start"

echo [2/2] Starting Frontend (Vite)...
start "AI-KIDS-FRONTEND" cmd /k "npm run dev"

echo.
echo ===================================================
echo   Project is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5001
echo ===================================================
pause
