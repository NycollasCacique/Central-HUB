@echo off
cd /d "%~dp0"
if exist ".tools\runtime\node.exe" (
  ".tools\runtime\node.exe" "node_modules\vite\bin\vite.js" --host 127.0.0.1
) else (
  call npm run dev
)
pause
