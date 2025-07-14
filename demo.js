#!/usr/bin/env node

/**
 * Demo Script for React Native Push Notification App
 * This script simulates sending push notifications to test the application
 */

const https = require('https');

// Configuration (replace with your actual values)
const FCM_SERVER_KEY = 'your-server-key-here';
const FCM_TOKEN = 'device-fcm-token-here';

// Demo notification templates
const notificationTemplates = [
  {
    title: 'WhatsApp Style Message',
    body: 'You have received a new message from John Doe',
    data: {
      type: 'message',
      userId: 'user123',
      chatId: 'chat456',
      screen: 'notifications'
    }
  },
  {
    title: 'Incoming Voice Call',
    body: 'Sarah Wilson is calling you...',
    data: {
      type: 'call',
      callType: 'voice',
      userId: 'user789',
      screen: 'home'
    }
  },
  {
    title: 'Video Call',
    body: 'Mike Johnson wants to video chat',
    data: {
      type: 'call',
      callType: 'video',
      userId: 'user456',
      screen: 'home'
    }
  },
  {
    title: 'Group Message',
    body: 'Team Chat: "Don\'t forget about the meeting at 3 PM"',
    data: {
      type: 'group_message',
      groupId: 'group123',
      userId: 'user321',
      screen: 'notifications'
    }
  }
];

/**
 * Send FCM notification
 */
function sendNotification(template) {
  const payload = JSON.stringify({
    to: FCM_TOKEN,
    notification: {
      title: template.title,
      body: template.body,
      sound: 'default',
      badge: 1
    },
    data: template.data,
    android: {
      notification: {
        channelId: 'default-channel-id',
        priority: 'high',
        defaultSound: true,
        defaultVibrateTimings: true,
        defaultLightSettings: true,
        color: '#25d366'
      }
    }
  });

  const options = {
    hostname: 'fcm.googleapis.com',
    port: 443,
    path: '/fcm/send',
    method: 'POST',
    headers: {
      'Authorization': `key=${FCM_SERVER_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    res.on('data', (d) => {
      const response = JSON.parse(d.toString());
      console.log('FCM Response:', response);
    });
  });

  req.on('error', (e) => {
    console.error('Error sending notification:', e);
  });

  req.write(payload);
  req.end();
}

/**
 * Demo script main function
 */
function runDemo() {
  console.log('🚀 React Native Push Notification Demo');
  console.log('======================================\n');

  if (FCM_SERVER_KEY === 'your-server-key-here' || FCM_TOKEN === 'device-fcm-token-here') {
    console.log('⚠️  Please update the FCM_SERVER_KEY and FCM_TOKEN in this script');
    console.log('   You can get these values from:');
    console.log('   - Server Key: Firebase Console > Project Settings > Cloud Messaging');
    console.log('   - FCM Token: Copy from the app\'s home screen\n');
    
    console.log('📱 Instructions:');
    console.log('1. Set up Firebase project');
    console.log('2. Add google-services.json to android/app/');
    console.log('3. Update firebase config in src/config/firebase.ts');
    console.log('4. Run the app and get FCM token from home screen');
    console.log('5. Update this script with your server key and token');
    console.log('6. Run: node demo.js\n');
    
    return;
  }

  console.log('📬 Sending demo notifications...\n');

  // Send each template with a delay
  notificationTemplates.forEach((template, index) => {
    setTimeout(() => {
      console.log(`📱 Sending: ${template.title}`);
      sendNotification(template);
    }, index * 3000); // 3 second delay between notifications
  });

  console.log('✅ Demo notifications scheduled!');
  console.log('   Check your device for incoming notifications\n');
}

// Command line arguments handling
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('React Native Push Notification Demo Script');
  console.log('Usage: node demo.js [options]');
  console.log('');
  console.log('Options:');
  console.log('  --help, -h     Show help');
  console.log('  --single       Send single test notification');
  console.log('  --continuous   Send notifications every 30 seconds');
  console.log('');
} else if (args.includes('--single')) {
  console.log('📱 Sending single test notification...');
  sendNotification(notificationTemplates[0]);
} else if (args.includes('--continuous')) {
  console.log('🔄 Starting continuous notification demo (every 30 seconds)');
  console.log('   Press Ctrl+C to stop\n');
  
  setInterval(() => {
    const randomTemplate = notificationTemplates[
      Math.floor(Math.random() * notificationTemplates.length)
    ];
    console.log(`📱 Sending: ${randomTemplate.title}`);
    sendNotification(randomTemplate);
  }, 30000);
} else {
  runDemo();
}

module.exports = {
  sendNotification,
  notificationTemplates
};
