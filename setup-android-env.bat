@echo off
echo Setting up Android Development Environment Variables...

REM Set ANDROID_HOME environment variable
setx ANDROID_HOME "C:\Users\%USERNAME%\AppData\Local\Android\Sdk" /M

REM Add Android tools to PATH
setx PATH "%PATH%;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\tools;C:\Users\%USERNAME%\AppData\Local\Android\Sdk\tools\bin" /M

echo.
echo Environment variables have been set!
echo ANDROID_HOME: C:\Users\%USERNAME%\AppData\Local\Android\Sdk
echo.
echo IMPORTANT: You need to restart your computer or VS Code for changes to take effect.
echo.
echo Press any key to continue...
pause > nul
