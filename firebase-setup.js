#!/usr/bin/env node

/**
 * Firebase Quick Setup Helper
 * Helps you configure Firebase step by step
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔥 Firebase Quick Setup Helper');
console.log('===============================\n');

console.log('This script will help you configure Firebase for your React Native app.\n');

function showInstructions() {
  console.log('📋 Step-by-Step Firebase Setup:');
  console.log('================================\n');
  
  console.log('🌐 Step 1: Create Firebase Project');
  console.log('   1. Open: https://console.firebase.google.com/');
  console.log('   2. Click "Add project" or "Create a project"');
  console.log('   3. Project name: "RN Push Notification App" (or your choice)');
  console.log('   4. Enable Google Analytics: Optional (recommended)');
  console.log('   5. Click "Create project"\n');
  
  console.log('📱 Step 2: Add Android App');
  console.log('   1. In Firebase Console, click "Add app" > Android');
  console.log('   2. Android package name: com.rnpushnotificationapp');
  console.log('   3. App nickname: RN Push Notification App');
  console.log('   4. Debug signing certificate: Skip for now');
  console.log('   5. Click "Register app"\n');
  
  console.log('📁 Step 3: Download Configuration');
  console.log('   1. Download google-services.json');
  console.log('   2. Save it to replace the file in: android/app/google-services.json');
  console.log('   3. Click "Next" > "Next" > "Continue to console"\n');
  
  console.log('🔧 Step 4: Get Your Firebase Config');
  console.log('   1. In Firebase Console, go to Project Settings (gear icon)');
  console.log('   2. Scroll down to "Your apps" section');
  console.log('   3. Click on your Android app');
  console.log('   4. Scroll to "SDK setup and configuration"');
  console.log('   5. Copy the firebaseConfig object\n');
  
  console.log('☁️  Step 5: Enable Cloud Messaging');
  console.log('   1. In Firebase Console, go to "Cloud Messaging"');
  console.log('   2. Note your Server Key (for testing)');
  console.log('   3. Your project is now ready!\n');
}

function updateConfigTemplate() {
  console.log('🔧 Let me help you update the Firebase config...\n');
  
  rl.question('Do you have your Firebase config ready? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      collectConfig();
    } else {
      console.log('\n📖 Please follow the setup instructions above first.');
      console.log('Then run this script again to update your config.\n');
      rl.close();
    }
  });
}

function collectConfig() {
  console.log('\nPlease enter your Firebase configuration values:');
  console.log('(You can find these in Firebase Console > Project Settings > Your apps)\n');
  
  const config = {};
  
  rl.question('API Key (starts with AIzaSy...): ', (apiKey) => {
    config.apiKey = apiKey.trim();
    
    rl.question('Project ID: ', (projectId) => {
      config.projectId = projectId.trim();
      config.authDomain = `${projectId}.firebaseapp.com`;
      config.storageBucket = `${projectId}.appspot.com`;
      
      rl.question('Messaging Sender ID (numbers): ', (senderId) => {
        config.messagingSenderId = senderId.trim();
        
        rl.question('App ID (starts with 1:): ', (appId) => {
          config.appId = appId.trim();
          
          updateConfigFile(config);
        });
      });
    });
  });
}

function updateConfigFile(config) {
  const configPath = path.join(__dirname, 'src', 'config', 'firebase.ts');
  
  const newConfigContent = `// Firebase configuration
export const firebaseConfig = {
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${config.appId}"
};

// Server key for testing (optional)
export const serverKey = "your-server-key-here";

// Configuration updated by Firebase setup helper
// If you need to update this again, run: node firebase-setup.js
`;

  try {
    fs.writeFileSync(configPath, newConfigContent, 'utf8');
    console.log('\n✅ Firebase configuration updated successfully!');
    console.log(`📁 Updated: ${configPath}\n`);
    
    console.log('🚀 Next steps:');
    console.log('1. Make sure you replaced android/app/google-services.json');
    console.log('2. Rebuild your app: cd android && ./gradlew assembleDebug');
    console.log('3. Run the app and test notifications');
    console.log('4. Use firebase-test.js for advanced testing\n');
    
    rl.close();
  } catch (error) {
    console.error('❌ Error updating config file:', error.message);
    rl.close();
  }
}

// Main menu
function showMenu() {
  console.log('What would you like to do?');
  console.log('1. Show setup instructions');
  console.log('2. Update Firebase config');
  console.log('3. Exit\n');
  
  rl.question('Choose an option (1-3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        showInstructions();
        setTimeout(() => {
          console.log('\n' + '='.repeat(50) + '\n');
          showMenu();
        }, 1000);
        break;
      case '2':
        updateConfigTemplate();
        break;
      case '3':
        console.log('👋 Good luck with your Firebase setup!');
        rl.close();
        break;
      default:
        console.log('❌ Invalid option. Please try again.\n');
        showMenu();
    }
  });
}

// Start the helper
showMenu();
