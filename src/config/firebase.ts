// Firebase configuration
// To set up Firebase for this project:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Add an Android app to your project
// 4. Download google-services.json and place it in android/app/
// 5. Replace the placeholder config below with your actual Firebase config

export const firebaseConfig = {
  apiKey: "AIzaSyBxwlLDU4xzBqXERLUZ-1pwYgNAugkFxvE", // Your actual API key
  authDomain: "rn-push-notification-app-61824.firebaseapp.com", // Your project domain
  projectId: "rn-push-notification-app-61824", // Your actual project ID
  storageBucket: "rn-push-notification-app-61824.firebasestorage.app", // Your storage bucket
  messagingSenderId: "443036739305", // Your sender ID
  appId: "1:443036739305:android:572c7450e534a78d097278" // Your app ID
};

// Demo configuration (will work once you replace with real values)
export const demoConfig = {
  // Your actual Firebase config will look like this:
  // apiKey: "AIzaSyC-demo_key_from_firebase_console",
  // authDomain: "rn-push-app-demo.firebaseapp.com", 
  // projectId: "rn-push-app-demo",
  // storageBucket: "rn-push-app-demo.appspot.com",
  // messagingSenderId: "123456789012",
  // appId: "1:123456789012:android:abcdef123456"
};

// Server key for testing (optional)
export const serverKey = "your-server-key-here";

// Instructions for setup:
/*
1. Firebase Console Setup:
   - Visit https://console.firebase.google.com/
   - Create or select your project
   - Go to Project Settings > General
   - Add Android app with package name: com.rnpushnotificationapp
   - Download google-services.json

2. Android Setup:
   - Place google-services.json in android/app/ directory
   - The gradle files are already configured for Firebase

3. Update this file:
   - Replace the placeholder values above with your actual Firebase config
   - Get these values from Firebase Console > Project Settings > General > Your apps

4. Testing:
   - Use Firebase Console > Cloud Messaging > Send your first message
   - Or use the backend simulator in the app
   - Or use curl/Postman with FCM REST API

5. FCM REST API Example:
   POST https://fcm.googleapis.com/fcm/send
   Headers:
     Authorization: key=YOUR_SERVER_KEY
     Content-Type: application/json
   Body:
   {
     "to": "FCM_TOKEN_FROM_APP",
     "notification": {
       "title": "Test Notification",
       "body": "This is a test from server"
     },
     "data": {
       "screen": "notifications",
       "customData": "value"
     }
   }
*/
