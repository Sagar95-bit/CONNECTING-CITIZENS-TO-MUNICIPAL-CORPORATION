@echo off
set "PATH=C:\Users\HP\nodejs;%PATH%"
echo ========================================================
echo  Starting PCMC Citizen Connect (Local Server)
echo ========================================================
echo Opening browser at http://localhost:5173 ...
start http://localhost:5173
echo.
echo Starting Vite server...
call "C:\Users\HP\nodejs\npm.cmd" run dev
pause
