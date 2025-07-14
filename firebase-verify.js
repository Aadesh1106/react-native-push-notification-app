#!/usr/bin/env node

/**
 * Firebase Setup Verification Script
 * Checks if Firebase is properly configured in your React Native app
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Firebase Setup Verification');
console.log('==============================\n');

const projectRoot = __dirname;
const checks = [];

// Check 1: google-services.json exists and is valid
function checkGoogleServices() {
  const googleServicesPath = path.join(projectRoot, 'android', 'app', 'google-services.json');
  
  try {
    if (fs.existsSync(googleServicesPath)) {
      const content = fs.readFileSync(googleServicesPath, 'utf8');
      const config = JSON.parse(content);
      
      if (config.project_info && config.project_info.project_id !== 'rnpushnotificationapp-demo') {
        checks.push('✅ google-services.json exists and appears to be real Firebase config');
        return true;
      } else {
        checks.push('⚠️  google-services.json exists but contains placeholder data');
        checks.push('   👉 Replace with your actual file from Firebase Console');
        return false;
      }
    } else {
      checks.push('❌ google-services.json not found in android/app/');
      checks.push('   👉 Download from Firebase Console and place in android/app/');
      return false;
    }
  } catch (error) {
    checks.push('❌ google-services.json exists but is invalid JSON');
    checks.push('   👉 Re-download from Firebase Console');
    return false;
  }
}

// Check 2: Firebase config in TypeScript
function checkFirebaseConfig() {
  const configPath = path.join(projectRoot, 'src', 'config', 'firebase.ts');
  
  try {
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf8');
      
      if (content.includes('your-api-key-here')) {
        checks.push('⚠️  Firebase config exists but contains placeholder values');
        checks.push('   👉 Update src/config/firebase.ts with your actual Firebase config');
        return false;
      } else if (content.includes('AIzaSy')) {
        checks.push('✅ Firebase config appears to have real API key');
        return true;
      } else {
        checks.push('⚠️  Firebase config exists but API key format unclear');
        return false;
      }
    } else {
      checks.push('❌ Firebase config file not found');
      return false;
    }
  } catch (error) {
    checks.push('❌ Error reading Firebase config file');
    return false;
  }
}

// Check 3: Firebase packages installed
function checkFirebasePackages() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  try {
    if (fs.existsSync(packageJsonPath)) {
      const content = fs.readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(content);
      
      const hasFirebaseApp = packageJson.dependencies && packageJson.dependencies['@react-native-firebase/app'];
      const hasFirebaseMessaging = packageJson.dependencies && packageJson.dependencies['@react-native-firebase/messaging'];
      
      if (hasFirebaseApp && hasFirebaseMessaging) {
        checks.push('✅ Firebase packages installed (@react-native-firebase/app, @react-native-firebase/messaging)');
        return true;
      } else {
        checks.push('❌ Firebase packages missing');
        checks.push('   👉 Run: npm install @react-native-firebase/app @react-native-firebase/messaging');
        return false;
      }
    } else {
      checks.push('❌ package.json not found');
      return false;
    }
  } catch (error) {
    checks.push('❌ Error reading package.json');
    return false;
  }
}

// Check 4: Android gradle configuration
function checkAndroidConfig() {
  const appBuildGradlePath = path.join(projectRoot, 'android', 'app', 'build.gradle');
  
  try {
    if (fs.existsSync(appBuildGradlePath)) {
      const content = fs.readFileSync(appBuildGradlePath, 'utf8');
      
      if (content.includes('com.google.gms.google-services')) {
        checks.push('✅ Google Services plugin configured in android/app/build.gradle');
        return true;
      } else {
        checks.push('❌ Google Services plugin not found in build.gradle');
        return false;
      }
    } else {
      checks.push('❌ android/app/build.gradle not found');
      return false;
    }
  } catch (error) {
    checks.push('❌ Error reading android/app/build.gradle');
    return false;
  }
}

// Check 5: App is built and ready
function checkAppBuild() {
  const apkPath = path.join(projectRoot, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  
  if (fs.existsSync(apkPath)) {
    checks.push('✅ App is built and ready (app-debug.apk exists)');
    return true;
  } else {
    checks.push('⚠️  App not built yet');
    checks.push('   👉 Run: cd android && ./gradlew assembleDebug');
    return false;
  }
}

// Run all checks
function runVerification() {
  console.log('Running verification checks...\n');
  
  const results = {
    googleServices: checkGoogleServices(),
    firebaseConfig: checkFirebaseConfig(),
    packages: checkFirebasePackages(),
    androidConfig: checkAndroidConfig(),
    appBuild: checkAppBuild()
  };
  
  // Display results
  checks.forEach(check => console.log(check));
  
  console.log('\n📊 Summary:');
  console.log('============');
  
  const passedChecks = Object.values(results).filter(Boolean).length;
  const totalChecks = Object.keys(results).length;
  
  console.log(`${passedChecks}/${totalChecks} checks passed\n`);
  
  if (passedChecks === totalChecks) {
    console.log('🎉 Firebase is fully configured! Your app is ready for push notifications.');
    console.log('\n🚀 Next steps:');
    console.log('1. Make sure your app is running');
    console.log('2. Note the FCM token from the Home screen');
    console.log('3. Test notifications using Firebase Console');
    console.log('4. Or run: node firebase-test.js');
  } else {
    console.log('⚠️  Firebase setup is incomplete. Please address the issues above.');
    console.log('\n📋 Quick setup guide:');
    console.log('1. Create Firebase project at https://console.firebase.google.com/');
    console.log('2. Add Android app with package name: com.rnpushnotificationapp');
    console.log('3. Download google-services.json to android/app/');
    console.log('4. Update src/config/firebase.ts with your project config');
    console.log('5. Rebuild the app');
  }
  
  console.log('\n📖 Full guide: See FIREBASE_INTEGRATION_GUIDE.md');
}

runVerification();
