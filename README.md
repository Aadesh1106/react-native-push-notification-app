# 📱 React Native Push Notification App

A comprehensive React Native application demonstrating **WhatsApp-style push notifications** with **Firebase Cloud Messaging (FCM)**, **native Android modules**, and **deep linking** support. Built for Android 15 compatibility as part of a React Native internship assignment.

## 🎯 Assignment Requirements Met

✅ **Basic React Native App** - Clean, modern UI with navigation  
✅ **Real-time Push Notifications** - Firebase Cloud Messaging integration  
✅ **WhatsApp-style Notifications** - Background and killed app support  
✅ **Native Android Module** - Custom Java module for advanced notifications  
✅ **Deep Linking** - Notification taps open specific screens  
✅ **Local Notification Storage** - AsyncStorage for notification history  
✅ **Badge Count Management** - WhatsApp-like badge functionality  
✅ **Backend Simulation** - Built-in notification simulator  

## 🚀 Features

### Core Functionality
- **Firebase Cloud Messaging (FCM)** integration
- **WhatsApp-style notification UI** with action buttons
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

## 📁 Project Structure

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

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
