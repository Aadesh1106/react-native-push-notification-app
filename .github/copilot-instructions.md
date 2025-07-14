<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React Native Push Notification App - Copilot Instructions

This is a React Native application demonstrating WhatsApp-style push notifications with Firebase Cloud Messaging, native Android modules, and deep linking support.

## Project Context
- **Framework**: React Native 0.80.1 with TypeScript
- **Platform**: Android (with Android 15 compatibility)
- **Main Features**: FCM, push notifications, native modules, deep linking
- **Architecture**: Modular structure with services, screens, and utilities

## Key Technologies
- React Native with TypeScript
- Firebase Cloud Messaging (@react-native-firebase)
- React Navigation for screen navigation
- AsyncStorage for local data persistence
- Native Android modules (Java/Kotlin)
- WhatsApp-style UI/UX patterns

## Coding Guidelines
- Use TypeScript throughout the application
- Follow React Native best practices
- Implement proper error handling and logging
- Use modular architecture with separation of concerns
- Follow WhatsApp-style design patterns for notifications
- Ensure Android 15 compatibility

## File Structure Guidelines
- `src/screens/` - React Native screen components
- `src/services/` - Business logic and external service integrations
- `src/utils/` - Utility functions and helpers
- `src/config/` - Configuration files
- `android/app/src/main/java/com/rnpushnotificationapp/modules/` - Native Android modules

## Firebase Integration
- Use @react-native-firebase packages for FCM
- Handle both foreground and background notifications
- Implement proper token management
- Support topic subscriptions

## Native Module Development
- Write native Android modules in Java/Kotlin
- Follow React Native bridge patterns
- Implement proper error handling in native code
- Support Android notification channels and features

## Notification Features to Implement
- WhatsApp-style notification UI
- Background and killed app notification handling
- Deep linking from notifications
- Local notification storage
- Badge count management
- Multiple notification types (message, call, group, etc.)

## Code Style
- Use ESLint and Prettier configurations
- Follow React hooks patterns
- Implement proper TypeScript typing
- Use async/await for asynchronous operations
- Add proper JSDoc comments for complex functions
