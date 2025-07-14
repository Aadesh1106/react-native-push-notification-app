# 🔥 Complete Firebase Integration Guide

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Add project" or "Create a project"**
3. **Enter project details**:
   - Project name: `RN Push Notification App` (or your preferred name)
   - Project ID: Will be auto-generated (e.g., `rn-push-notification-app-12345`)
   - Enable Google Analytics (optional, recommended for production)

## Step 2: Add Android App to Firebase

1. **In Firebase Console, click "Add app" > Android**
2. **Enter app details**:
   - Android package name: `com.rnpushnotificationapp`
   - App nickname: `RN Push Notification App`
   - Debug signing certificate SHA-1: (Skip for now, optional)

3. **Download `google-services.json`**
   - This file contains your Firebase configuration
   - **IMPORTANT**: Replace the placeholder file in `android/app/google-services.json`

## Step 3: Enable Cloud Messaging

1. **In Firebase Console, go to your project**
2. **Navigate to: Build > Cloud Messaging**
3. **Note your Server Key** (for backend testing)
4. **Enable Cloud Messaging API** if prompted

## Step 4: Update Firebase Configuration

Replace the placeholder config in `src/config/firebase.ts` with your actual values:

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:android:abcdef..."
};
```

**Where to find these values:**
- Firebase Console > Project Settings > General > Your apps > SDK setup and configuration

## Step 5: Test Firebase Integration

### Option 1: Use Firebase Console (Easiest)
1. Go to Firebase Console > Cloud Messaging
2. Click "Send your first message"
3. Enter:
   - Notification title: "Test Notification"
   - Notification text: "Hello from Firebase!"
   - Target: Select your app
4. Click "Send"

### Option 2: Use the App's Test Buttons
Your app already has built-in test buttons that work with Firebase:
- **"Test Local Notification"** - Tests local notifications
- **"Test Native Notification"** - Tests the Java native module
- **"Simulate Remote"** - Simulates Firebase messages

### Option 3: Use curl/Postman (Advanced)
```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN_FROM_APP",
    "notification": {
      "title": "Test from Server",
      "body": "This is a test notification!"
    },
    "data": {
      "screen": "notifications",
      "customData": "hello"
    }
  }'
```

## Step 6: Verify Integration

### Check These Things:
1. ✅ **App runs without errors** (already working!)
2. ✅ **FCM token is generated** (check Home screen in app)
3. ✅ **Notifications appear** when sent from Firebase Console
4. ✅ **Deep linking works** (tap notification opens correct screen)
5. ✅ **Background notifications work** (minimize app, send notification)

### In Your App:
1. **Home Screen**: Shows your FCM token
2. **Notifications Screen**: Shows notification history
3. **Settings Screen**: Manage notification preferences

## Step 7: Production Setup (Optional)

For production apps, also configure:
1. **Release signing certificate SHA-1**
2. **Production server key security**
3. **Topic subscriptions** for broadcast messages
4. **Analytics and crash reporting**

## 🚨 Common Issues & Solutions

### Issue: "google-services.json not found"
**Solution**: Make sure you downloaded the real `google-services.json` from Firebase Console and placed it in `android/app/`

### Issue: "No FCM token generated"
**Solution**: 
1. Check internet connection
2. Verify `google-services.json` is correct
3. Check Firebase Console project settings

### Issue: "Notifications not received"
**Solution**:
1. Check notification permissions in Android settings
2. Verify FCM token in app
3. Test with Firebase Console first
4. Check server key if using API

## 🎯 Next Steps

1. **Replace placeholder `google-services.json`** with your real file
2. **Update `firebase.ts`** with your project config
3. **Test notifications** using Firebase Console
4. **Try background notifications** by minimizing the app
5. **Test deep linking** by including data in notifications

Your React Native app is already fully configured for Firebase - you just need to connect it to your actual Firebase project! 🚀
