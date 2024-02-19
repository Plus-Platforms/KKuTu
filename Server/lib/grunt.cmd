@echo off
setlocal

set "basedir=%~dp0"

:: Change directory to ../../frontpage
cd /d "%basedir%\..\..\neofront%" || exit /b

:: Run npm run build
npm run build
set "ret=%errorlevel%"
if %ret% neq 0 (
  echo npm run build failed. Exiting.
  exit /b %ret%
)

:: Change directory back to the original basedir
cd /d "%basedir%\..\Server\lib%" || exit /b

:: Run grunt
grunt

exit /b %ret%
