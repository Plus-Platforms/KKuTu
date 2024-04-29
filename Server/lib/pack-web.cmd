@echo off
setlocal

:: Get the directory of the batch file
for %%I in ("%~dp0") do set "basedir=%%~fI"
cd /d "%basedir%\..\..\Front" || exit

if "%~1"=="--skip-svelte" (
    echo Skipping Svelte build...
) else (
    npm run build
    if errorlevel 1 (
        echo npm run build failed. Exiting.
        exit /b %errorlevel%
    )
)

cd "..\Server\lib" || exit

if "%~1"=="--skip-webp" (
    echo Skipping WebP optimization...
) else (
    if exist "%basedir%\node.exe" (
        "%basedir%\node.exe" "%basedir%\optimization\webp.js"
    ) else (
        node "%basedir%\optimization\webp.js"
    )
)

if "%~1"=="--skip-ogg" (
    echo Skipping OGG optimization...
) else (
    cd "Web\public\media\kkutu" || exit
    for %%F in (*.mp3) do (
        ffmpeg -i "%%F" -c:a libopus -b:a 96k -ac 1 -map_metadata -1 "%%~nF.ogg"
    )
)

if exist "%basedir%\node.exe" (
    "%basedir%\node.exe" "%basedir%\..\..\..\..\node_modules\grunt\bin\grunt" %*
) else (
    node "%basedir%\..\..\..\..\node_modules\grunt\bin\grunt" %*
)
exit /b %errorlevel%
