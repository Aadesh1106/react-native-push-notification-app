@echo off
echo Installing required Android SDK components...

set ANDROID_HOME=C:\Users\aades\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

echo Installing Android SDK Platform 35...
sdkmanager "platforms;android-35"

echo Installing Android SDK Build-Tools 35.0.0...
sdkmanager "build-tools;35.0.0"

echo Installing Android SDK Platform-Tools...
sdkmanager "platform-tools"

echo Installing Android NDK 27.1.12297006...
sdkmanager "ndk;27.1.12297006"

echo Installing Android Emulator...
sdkmanager "emulator"

echo Installing System Images for Android 35...
sdkmanager "system-images;android-35;google_apis;x86_64"

echo All components installed!
pause
