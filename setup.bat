@echo off
echo 🛠️ React Native Push Notification App - Development Setup
echo ================================================================

echo.
echo 📋 Prerequisites Check:
echo.

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js is installed
    node --version
) else (
    echo ❌ Node.js is not installed
    echo    Please download from: https://nodejs.org/
)

echo.
echo 📱 Android Development Setup Required:
echo.
echo 1. Download and Install Android Studio:
echo    https://developer.android.com/studio
echo.
echo 2. During installation, make sure to install:
echo    - Android SDK
echo    - Android SDK Platform
echo    - Android Virtual Device
echo.
echo 3. After installation:
echo    - Open Android Studio
echo    - Go through the setup wizard
echo    - Create a new project (any template)
echo    - Go to Tools ^> SDK Manager
echo    - Install Android 13 (API 33) or higher
echo.
echo 4. Create Android Virtual Device:
echo    - Tools ^> AVD Manager
echo    - Create Virtual Device
echo    - Choose Pixel 6 or similar
echo    - Select system image (API 33+)
echo    - Finish and start emulator
echo.
echo 5. Set Environment Variables:
echo    - ANDROID_HOME = C:\Users\%USERNAME%\AppData\Local\Android\Sdk
echo    - Add to PATH: %%ANDROID_HOME%%\platform-tools
echo    - Add to PATH: %%ANDROID_HOME%%\tools
echo.
echo 6. Update local.properties file:
echo    The file is already created at:
echo    android\local.properties
echo    Update the sdk.dir path if needed.
echo.
echo 🎯 After completing the setup, run:
echo    npm run android
echo.
echo 📞 Need help? Check SETUP.md for detailed instructions.
echo.
pause
