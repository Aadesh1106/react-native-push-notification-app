import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// No need for module augmentation since 'react-native-push-notification' is untyped.
// If you need to suppress TypeScript errors, use 'as any' where necessary.

class FirebaseService {
  constructor() {
    this.initializePushNotifications();
  }

  async initializePushNotifications() {
    // Initialize push notifications
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        AsyncStorage.setItem('fcmToken', token.token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        
        // Handle notification tap
        if (notification.userInteraction) {
          // Notification was tapped by user
          console.log('Notification tapped');
        }
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    // Create notification channels for Android
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default',
        channelDescription: 'A default channel for notifications',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    // Request permission for iOS
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.getFCMToken();
    }

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      this.showNotification(remoteMessage);
    });

    // Handle foreground messages
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      this.showNotification(remoteMessage);
    });
  }

  async getFCMToken() {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      await AsyncStorage.setItem('fcmToken', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  showNotification(remoteMessage: any) {
    const { notification, data } = remoteMessage;
    
    PushNotification.localNotification({
      title: notification?.title || 'New Message',
      message: notification?.body || 'You have a new message',
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      channelId: 'default-channel-id',
      userInfo: data,
      actions: ['Accept', 'Decline'],
      invokeApp: true,
      // WhatsApp-like styling
      bigText: notification?.body,
      subText: 'WhatsApp Style Notification',
      color: '#25d366', // WhatsApp green
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
    });
  }

  async subscribeToTopic(topic: string) {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  }

  async unsubscribeFromTopic(topic: string) {
    try {
      await messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  }

  // Local notification for testing
  showLocalNotification(title: string, message: string, data?: any) {
    PushNotification.localNotification({
      title,
      message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      channelId: 'default-channel-id',
      userInfo: data,
      invokeApp: true,
      bigText: message,
      subText: 'Local Notification',
      color: '#25d366',
    });
  }

  // Badge count management
  async updateBadgeCount(count: number) {
    try {
      PushNotification.setApplicationIconBadgeNumber(count);
      await AsyncStorage.setItem('badgeCount', count.toString());
    } catch (error) {
      console.error('Error updating badge count:', error);
    }
  }

  async getBadgeCount(): Promise<number> {
    try {
      const count = await AsyncStorage.getItem('badgeCount');
      return count ? parseInt(count, 10) : 0;
    } catch (error) {
      console.error('Error getting badge count:', error);
      return 0;
    }
  }

  // Clear all notifications
  clearAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
    this.updateBadgeCount(0);
  }
}

export default new FirebaseService();
