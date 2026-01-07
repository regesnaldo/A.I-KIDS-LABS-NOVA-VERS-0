@echo off
echo ===================================================
echo   A.I. KIDS LABS - DEPLOY SCRIPT
echo ===================================================

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo [2/3] Installing Frontend Dependencies...
cd frontend
call npm install

echo [3/3] Building Frontend for Production...
call npm run build
cd ..

echo.
echo ===================================================
echo   Build Complete!
echo   Frontend build is in frontend/dist
echo ===================================================
pause
