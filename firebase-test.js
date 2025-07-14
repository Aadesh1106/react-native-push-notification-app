#!/usr/bin/env node

/**
 * Firebase Integration Test Script
 * Tests Firebase Cloud Messaging with your React Native app
 */

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔥 Firebase Integration Test Script');
console.log('=====================================\n');

// Test configuration
let serverKey = '';
let fcmToken = '';

function promptForDetails() {
  return new Promise((resolve) => {
    console.log('Please provide the following from your Firebase Console:\n');
    
    rl.question('1. Server Key (Cloud Messaging > Project credentials): ', (key) => {
      serverKey = key.trim();
      
      rl.question('2. FCM Token (from your app\'s Home screen): ', (token) => {
        fcmToken = token.trim();
        resolve();
      });
    });
  });
}

function sendTestNotification(type = 'basic') {
  const notifications = {
    basic: {
      title: 'Firebase Test',
      body: 'Hello from Firebase! Integration working perfectly! 🎉',
      data: { screen: 'notifications', test: 'true' }
    },
    whatsapp: {
      title: 'WhatsApp Style Test',
      body: 'New message from Firebase Cloud Messaging',
      data: { 
        screen: 'notifications', 
        type: 'message',
        userId: 'firebase_test',
        timestamp: Date.now().toString()
      }
    },
    call: {
      title: 'Incoming Call',
      body: 'Firebase User is calling...',
      data: { 
        screen: 'home',
        type: 'call',
        callType: 'voice',
        userId: 'firebase_caller'
      }
    }
  };

  const notification = notifications[type] || notifications.basic;
  
  const payload = JSON.stringify({
    to: fcmToken,
    notification: {
      title: notification.title,
      body: notification.body,
      sound: 'default',
      badge: 1
    },
    data: notification.data,
    android: {
      notification: {
        channelId: 'default-channel-id',
        priority: 'high',
        defaultSound: true,
        defaultVibrateTimings: true,
        color: '#25d366',
        icon: 'ic_notification'
      }
    }
  });

  const options = {
    hostname: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Authorization': `key=${serverKey}`,
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  console.log(`\n📤 Sending ${type} notification...`);
  
  const req = https.request(options, (res) => {
    console.log(`✅ Response Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('🎉 Notification sent successfully!');
      console.log('📱 Check your app for the notification\n');
    } else {
      console.log('❌ Failed to send notification');
    }
    
    res.on('data', (d) => {
      const response = JSON.parse(d.toString());
      console.log('📋 FCM Response:', response);
    });
  });

  req.on('error', (e) => {
    console.error('❌ Error sending notification:', e.message);
  });

  req.write(payload);
  req.end();
}

function showMenu() {
  console.log('\n📋 Test Menu:');
  console.log('1. Send Basic Test Notification');
  console.log('2. Send WhatsApp Style Notification');
  console.log('3. Send Call Notification');
  console.log('4. Send Topic Notification');
  console.log('5. Exit');
  
  rl.question('\nChoose an option (1-5): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        sendTestNotification('basic');
        setTimeout(showMenu, 2000);
        break;
      case '2':
        sendTestNotification('whatsapp');
        setTimeout(showMenu, 2000);
        break;
      case '3':
        sendTestNotification('call');
        setTimeout(showMenu, 2000);
        break;
      case '4':
        sendTopicNotification();
        setTimeout(showMenu, 2000);
        break;
      case '5':
        console.log('👋 Goodbye!');
        rl.close();
        break;
      default:
        console.log('❌ Invalid option. Please try again.');
        showMenu();
    }
  });
}

function sendTopicNotification() {
  const payload = JSON.stringify({
    to: '/topics/test_notifications',
    notification: {
      title: 'Topic Notification',
      body: 'This is a broadcast message to all subscribers!',
      sound: 'default'
    },
    data: {
      screen: 'notifications',
      type: 'broadcast',
      topic: 'test_notifications'
    }
  });

  const options = {
    hostname: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Authorization': `key=${serverKey}`,
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  console.log('\n📡 Sending topic notification...');
  
  const req = https.request(options, (res) => {
    console.log(`✅ Response Status: ${res.statusCode}`);
    res.on('data', (d) => {
      const response = JSON.parse(d.toString());
      console.log('📋 FCM Response:', response);
    });
  });

  req.write(payload);
  req.end();
}

// Start the test script
async function main() {
  try {
    await promptForDetails();
    
    if (!serverKey || !fcmToken) {
      console.log('❌ Server key and FCM token are required!');
      console.log('\n📋 To get these:');
      console.log('1. Server Key: Firebase Console > Project Settings > Cloud Messaging');
      console.log('2. FCM Token: Open your React Native app and check the Home screen\n');
      rl.close();
      return;
    }
    
    console.log('\n✅ Configuration complete!');
    console.log('🚀 Ready to test Firebase notifications...\n');
    
    showMenu();
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
  }
}

main();
