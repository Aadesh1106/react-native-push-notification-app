#  React Native Push Notification App

A complete React Native application with **Firebase Cloud Messaging** integration, featuring **WhatsApp-style push notifications**, **native Android modules**, and **modern UI components**. Built for Android 15 compatibility with comprehensive Firebase integration.

##  Features

### Push Notifications
- **Firebase Cloud Messaging (FCM)** integration with real-time messaging
- **WhatsApp-style notifications** with custom styling and sound
- **Background & Foreground** notification handling
- **Deep linking** support for notification actions
- **Custom notification channels** and priority management
- **Action buttons** (Reply, Mark as Read, Open App)
- **Badge management** system with count persistence
- **Sound and vibration** customization

### User Interface
- **React Navigation** with tab-based navigation
- **Material Design** components with modern styling
- **Home Screen** - FCM token display and notification testing
- **Notifications Screen** - Notification history and management
- **Settings Screen** - App configuration and preferences
- **Responsive design** for various Android screen sizes

### Technical Implementation
- **Native Android modules** written in Java for advanced features
- **TypeScript** for enhanced type safety and development experience
- **Android 15 compatibility** with latest SDK (API 36)
- **Firebase SDK v22.4.0** with full FCM integration
- **AsyncStorage** for local data persistence
- **Hot reload** development support with Metro bundler

##  Assignment Requirements Met

 **React Native App** - Modern UI with navigation and state management  
 **Push Notifications** - Complete Firebase Cloud Messaging integration  
 **WhatsApp-style Design** - Custom notification styling and behavior  
 **Native Android Module** - Java module for advanced notification features  
 **Deep Linking** - URL schemes and notification tap handling  
 **Local Storage** - AsyncStorage for notification history  
 **Badge Management** - WhatsApp-like badge count functionality  
 **Firebase Integration** - Complete setup with google-services.json  
 **Android 15 Support** - Latest SDK compatibility and features
- **Background and killed app** notification handling
- **Deep linking** from notifications to specific screens
- **Local notification storage** with AsyncStorage
- **Badge count management** and persistence
- **Android 15 compatibility** with latest APIs

### Advanced Features
- **Native Android module** written in Java/Kotlin
- **Backend notification simulator** for testing
- **Multiple notification types** (message, call, group, file, status)
- **Notification history** with read/unread status
- **Settings screen** with customizable preferences
- **FCM token management** and topic subscriptions

##  Project Structure

```
RNPushNotificationApp/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Main dashboard with test buttons
│   │   ├── NotificationScreen.tsx  # Notification history and management
│   │   └── SettingsScreen.tsx      # App settings and configuration
│   ├── services/
│   │   ├── FirebaseService.ts      # FCM and notification handling
│   │   └── BackendSimulator.ts     # Simulated backend for testing
│   ├── utils/
│   │   └── DeepLinkHandler.ts      # Deep linking utilities
│   └── config/
│       └── firebase.ts             # Firebase configuration
├── android/
│   └── app/src/main/java/com/rnpushnotificationapp/modules/
│       ├── NotificationModule.java # Native Android notification module
│       └── NotificationPackage.java # Native module package
└── README.md
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.



# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
