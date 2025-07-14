# 🛠️ Setup Guide for React Native Push Notification App

This guide will help you set up the development environment and run the React Native Push Notification App.

## 📋 Prerequisites

### 1. System Requirements
- **Windows 10/11** (Current system)
- **Node.js** 16 or newer
- **Java Development Kit (JDK) 11 or newer**
- **Android Studio** with Android SDK
- **Git** for version control

### 2. Android Development Environment

#### Install Android Studio
1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Install with default settings
3. Open Android Studio and go through the setup wizard
4. Install the Android SDK (API level 33 or higher)

#### Configure Environment Variables
Add these to your system environment variables:

```bash
# Android SDK path (adjust path as needed)
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk

# Add to PATH
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin
```

#### Create Android Virtual Device (AVD)
1. Open Android Studio
2. Go to Tools > AVD Manager
3. Create a new virtual device
4. Choose a device (e.g., Pixel 6)
5. Select a system image (API 33 or higher)
6. Finish setup and start the emulator

### 3. React Native CLI
```bash
npm install -g react-native-cli
```

## 🚀 Project Setup

### 1. Clone and Install Dependencies
```bash
# Navigate to project directory
cd RNPushNotificationApp

# Install npm dependencies
npm install

# For iOS (if needed later)
cd ios && pod install && cd ..
```

### 2. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Add an Android app:
   - Package name: `com.rnpushnotificationapp`
   - App nickname: `RN Push Notification App`
   - SHA-1 certificate: (optional for development)

#### Download Configuration
1. Download `google-services.json`
2. Place it in `android/app/google-services.json`
3. Replace the placeholder file that's already there

#### Update Firebase Config
Update `src/config/firebase.ts` with your Firebase project configuration:
```typescript
export const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:android:your-app-id"
};
```

### 3. Enable Cloud Messaging
1. In Firebase Console, go to Project Settings
2. Navigate to Cloud Messaging tab
3. Note down the Server Key (for testing notifications)

## 🏃‍♂️ Running the Application

### 1. Start Metro Bundler
```bash
npm start
```

### 2. Run on Android Device/Emulator
```bash
# Make sure Android emulator is running or device is connected
npm run android
```

### 3. Alternative: Use VS Code Tasks
- Open Command Palette (`Ctrl+Shift+P`)
- Type "Tasks: Run Task"
- Select one of the available tasks:
  - "Start React Native Metro"
  - "Run Android App"
  - "Clean Android Build"

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "SDK location not found"
**Solution**: Set up ANDROID_HOME environment variable:
```bash
# Add to system environment variables
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
```

#### 2. "adb not recognized"
**Solution**: Add Android SDK tools to PATH:
```bash
PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

#### 3. "No emulators found"
**Solution**: 
- Open Android Studio
- Create and start an AVD (Android Virtual Device)
- Or connect a physical Android device with USB debugging enabled

#### 4. Build errors related to React Native
**Solution**:
```bash
# Clear React Native cache
npm start -- --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Rebuild
npm run android
```

#### 5. Firebase/FCM issues
**Solution**:
- Ensure `google-services.json` is in the correct location
- Verify Firebase configuration in `src/config/firebase.ts`
- Check that Firebase project has Cloud Messaging enabled

## 📱 Testing Push Notifications

### 1. Get FCM Token
1. Run the app
2. Navigate to Home screen
3. Copy the FCM token displayed

### 2. Test with Firebase Console
1. Go to Firebase Console > Cloud Messaging
2. Click "Send your first message"
3. Enter title and message
4. Select your app and send

### 3. Test with Demo Script
```bash
# Update demo.js with your server key and FCM token
node demo.js

# For continuous testing
node demo.js --continuous

# For single notification
node demo.js --single
```

### 4. Test with curl
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test notification"
    },
    "data": {
      "screen": "notifications"
    }
  }'
```

## 🧪 Testing Features

### 1. Local Notifications
- Use "Show Local Notification" button on home screen
- Tests react-native-push-notification package

### 2. Native Android Notifications
- Use "Show Native Android Notification" button
- Tests custom Java module functionality

### 3. Deep Linking
- Send notification with `"screen": "notifications"` in data
- Tap notification to test navigation

### 4. Background Notifications
- Put app in background
- Send notification via Firebase Console or demo script
- Verify notification appears in system tray

### 5. Badge Count
- Send multiple notifications
- Check badge count on home screen
- Test "Clear All Notifications" functionality

## 📂 Project Structure Overview

```
RNPushNotificationApp/
├── src/
│   ├── screens/           # React Native screens
│   ├── services/          # Business logic and APIs
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
├── android/
│   ├── app/
│   │   ├── src/main/java/ # Native Android modules
│   │   └── google-services.json # Firebase config
│   └── build.gradle       # Android build configuration
├── .vscode/
│   └── tasks.json         # VS Code tasks
├── demo.js                # Notification testing script
└── README.md              # Main documentation
```

## 🎯 Next Steps

1. **Set up development environment** following this guide
2. **Configure Firebase** with your own project
3. **Test the application** using various notification methods
4. **Customize notifications** for your specific use case
5. **Deploy and test** on physical devices

## 📞 Support

If you encounter issues:
1. Check this setup guide thoroughly
2. Verify all environment variables are set correctly
3. Ensure Android emulator or device is properly connected
4. Check Firebase configuration and permissions
5. Review React Native doctor output: `npx react-native doctor`

---

*This setup guide ensures you have everything needed to run and test the WhatsApp-style push notification application successfully.*
