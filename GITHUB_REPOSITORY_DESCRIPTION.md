# React Native Push Notification App 🔔

A complete React Native application with Firebase Cloud Messaging integration, featuring WhatsApp-style push notifications, native Android modules, and modern UI components.

## 🚀 Features

### Push Notifications
- **Firebase Cloud Messaging (FCM)** integration
- **WhatsApp-style notifications** with custom styling
- **Background & Foreground** notification handling
- **Deep linking** support for notification actions
- **Custom notification channels** and sounds
- **Action buttons** (Reply, Mark as Read)
- **Badge management** system

### User Interface
- **React Navigation** with tab-based navigation
- **Modern Material Design** components
- **Home Screen** with FCM token display and testing
- **Notifications Screen** with notification history
- **Settings Screen** for app configuration
- **Responsive design** for various screen sizes

### Technical Implementation
- **Native Android modules** written in Java
- **TypeScript** for type safety
- **Android 15 compatibility** with latest SDK
- **Firebase SDK v22.4.0** integration
- **AsyncStorage** for local data persistence
- **Hot reload** development support

## 📱 Screenshots

### App Screens
- **Home**: FCM token display, notification testing buttons
- **Notifications**: History and management interface  
- **Settings**: App configuration and preferences

### Notification Features
- **Custom notification styling** matching WhatsApp design
- **Interactive action buttons** for quick responses
- **Sound and vibration** customization
- **Priority and channel** management

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** 18+ 
- **React Native CLI**
- **Android Studio** with SDK 36
- **Java 17+**
- **Firebase Project** with FCM enabled

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Aadesh1106/react-native-push-notification-app.git
cd react-native-push-notification-app

# Install dependencies
npm install

# Android Setup
cd android
./gradlew clean
cd ..

# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android
```

### Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add Android app with package name: `com.rnpushnotificationapp`
3. Download `google-services.json` and place in `android/app/`
4. Update Firebase config in `src/config/firebase.ts`

## 📋 Project Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── screens/
│   ├── HomeScreen.tsx       # Main dashboard with FCM token
│   ├── NotificationsScreen.tsx  # Notification history
│   └── SettingsScreen.tsx   # App settings
├── services/
│   └── NotificationService.ts   # FCM service logic
└── utils/
    └── constants.ts         # App constants

android/
├── app/
│   ├── src/main/java/com/rnpushnotificationapp/
│   │   └── modules/
│   │       └── NotificationModule.java  # Native notification module
│   └── google-services.json    # Firebase configuration
└── build.gradle            # Android build configuration
```

## 🔧 Configuration

### Firebase Setup
- **Project ID**: Configure in `firebase.ts`
- **FCM Tokens**: Automatically generated and displayed
- **Notification Channels**: Customizable in native module
- **Deep Links**: Configurable URL schemes

### Android Configuration
- **Target SDK**: 36 (Android 15)
- **Min SDK**: 24 (Android 7.0)
- **Permissions**: INTERNET, WAKE_LOCK, VIBRATE
- **Services**: Firebase Messaging Service

## 📚 Usage

### Testing Push Notifications
1. **Launch the app** on Android device/emulator
2. **Copy FCM token** from Home screen
3. **Send test notification** using Firebase Console:
   - Go to Cloud Messaging
   - Create new campaign
   - Paste FCM token as target

### Development Workflow
1. **Hot Reload**: Make code changes and see instantly
2. **Debug**: Use Chrome DevTools via Metro
3. **Build**: `npx react-native run-android`
4. **Logs**: `npx react-native log-android`

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React Native 0.80.1, TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Hooks, AsyncStorage
- **Push Notifications**: Firebase Cloud Messaging
- **Native Modules**: Java (Android)
- **Build System**: Gradle 8.14.1

### Design Patterns
- **Component-based architecture**
- **Service layer for business logic**
- **Native bridge for platform-specific features**
- **Configuration-driven setup**

## 🚀 Deployment

### Development Build
```bash
cd android
./gradlew assembleDebug
```

### Production Build
```bash
cd android
./gradlew assembleRelease
```

### Publishing
- **Google Play Store**: Use signed release APK
- **Firebase App Distribution**: For beta testing
- **Internal Testing**: Use debug APK

## 🐛 Troubleshooting

### Common Issues
- **Build Errors**: Check Android SDK and dependencies
- **FCM Issues**: Verify Firebase configuration
- **Emulator Problems**: Ensure proper AVD setup
- **Path Issues**: Use short directory paths on Windows

### Debug Commands
```bash
# Check devices
adb devices

# View logs
npx react-native log-android

# Clean build
cd android && ./gradlew clean
```

## 📄 Documentation

- **Setup Guide**: `SETUP.md`
- **Firebase Integration**: `FIREBASE_INTEGRATION_COMPLETED.md`
- **Android Setup**: `ANDROID_SETUP_FIX.md`
- **Quick Demo**: `QUICK_DEMO.md`

## 🤝 Contributing

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature-name`
3. **Commit changes**: `git commit -m 'Add feature'`
4. **Push to branch**: `git push origin feature-name`
5. **Create Pull Request**

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aadesh N** - [@Aadesh1106](https://github.com/Aadesh1106)

## 🙏 Acknowledgments

- **React Native Community** for excellent documentation
- **Firebase Team** for robust cloud messaging
- **Android Developers** for comprehensive native APIs
- **Open Source Contributors** for inspiration and code references

## 📊 Stats

- **Language**: TypeScript, Java
- **Platform**: Android (iOS ready)
- **Dependencies**: Firebase, React Navigation, AsyncStorage
- **Build Size**: ~15MB (debug), ~8MB (release)
- **Min Android Version**: 7.0 (API 24)
- **Target Android Version**: 15 (API 36)

---

⭐ **Star this repository** if you find it useful!

🔗 **Live Demo**: [Download APK](releases/latest)

📧 **Support**: Create an [Issue](issues/new) for questions or bugs
