import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  NativeModules,
  Platform,
} from 'react-native';
import FirebaseService from '../services/FirebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { NotificationModule } = NativeModules;

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [fcmToken, setFcmToken] = useState<string>('');
  const [badgeCount, setBadgeCount] = useState<number>(0);

  useEffect(() => {
    initializeNotifications();
    loadBadgeCount();
  }, []);

  const initializeNotifications = async () => {
    try {
      // Get FCM token
      const token = await FirebaseService.getFCMToken();
      if (token) {
        setFcmToken(token);
      }

      // Subscribe to a topic for testing
      await FirebaseService.subscribeToTopic('test_notifications');
      
      console.log('Notifications initialized successfully');
    } catch (error) {
      console.error('Error initializing notifications:', error);
      Alert.alert('Error', 'Failed to initialize notifications');
    }
  };

  const loadBadgeCount = async () => {
    const count = await FirebaseService.getBadgeCount();
    setBadgeCount(count);
  };

  const showLocalNotification = () => {
    FirebaseService.showLocalNotification(
      'Test Notification',
      'This is a test notification from the app!',
      { screen: 'Notifications', timestamp: Date.now() }
    );
    
    // Update badge count
    const newCount = badgeCount + 1;
    setBadgeCount(newCount);
    FirebaseService.updateBadgeCount(newCount);
  };

  const showNativeNotification = async () => {
    if (Platform.OS === 'android' && NotificationModule) {
      try {
        await NotificationModule.showWhatsAppStyleNotification({
          title: 'WhatsApp Style',
          message: 'This is a native Android notification with WhatsApp styling!',
          deepLink: 'notifications',
          actions: ['Reply', 'Mark as Read'],
        });
        
        // Update badge count
        const newCount = badgeCount + 1;
        setBadgeCount(newCount);
        FirebaseService.updateBadgeCount(newCount);
      } catch (error) {
        console.error('Error showing native notification:', error);
        Alert.alert('Error', 'Failed to show native notification');
      }
    } else {
      Alert.alert('Info', 'Native notifications are only available on Android');
    }
  };

  const simulateRemoteNotification = () => {
    // Simulate a remote notification
    const remoteMessage = {
      notification: {
        title: 'Remote Notification',
        body: 'This simulates a notification from the server!',
      },
      data: {
        screen: 'Notifications',
        userId: '123',
        messageId: 'msg_' + Date.now(),
      },
    };

    FirebaseService.showNotification(remoteMessage);
    
    // Update badge count
    const newCount = badgeCount + 1;
    setBadgeCount(newCount);
    FirebaseService.updateBadgeCount(newCount);
  };

  const clearAllNotifications = async () => {
    FirebaseService.clearAllNotifications();
    setBadgeCount(0);
    
    if (Platform.OS === 'android' && NotificationModule) {
      try {
        await NotificationModule.clearAllNotifications();
      } catch (error) {
        console.error('Error clearing native notifications:', error);
      }
    }
    
    Alert.alert('Success', 'All notifications cleared');
  };

  const checkDeepLink = async () => {
    if (Platform.OS === 'android' && NotificationModule) {
      try {
        const result = await NotificationModule.getDeepLinkFromNotification();
        if (result && result.deepLink) {
          Alert.alert('Deep Link Found', `Deep link: ${result.deepLink}`);
          // Navigate based on deep link
          if (result.deepLink === 'notifications') {
            navigation.navigate('Notifications');
          }
        } else {
          Alert.alert('No Deep Link', 'No deep link found in notification');
        }
      } catch (error) {
        console.error('Error checking deep link:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>WhatsApp Style Push Notifications</Text>
        <Text style={styles.subtitle}>Demo App for React Native Internship</Text>
        
        {badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Badge Count: {badgeCount}</Text>
          </View>
        )}

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>FCM Token:</Text>
          <Text style={styles.tokenText} numberOfLines={3}>
            {fcmToken || 'Loading...'}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={showLocalNotification}>
            <Text style={styles.buttonText}>Show Local Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={showNativeNotification}>
            <Text style={styles.buttonText}>Show Native Android Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.accentButton]}
            onPress={simulateRemoteNotification}>
            <Text style={styles.buttonText}>Simulate Remote Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={clearAllNotifications}>
            <Text style={styles.buttonText}>Clear All Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={checkDeepLink}>
            <Text style={styles.buttonText}>Check Deep Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.navigationButton]}
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.buttonText}>View Notifications Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.navigationButton]}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Features Implemented:</Text>
          <Text style={styles.infoItem}>✅ Firebase Cloud Messaging (FCM)</Text>
          <Text style={styles.infoItem}>✅ WhatsApp-style notifications</Text>
          <Text style={styles.infoItem}>✅ Background/killed app support</Text>
          <Text style={styles.infoItem}>✅ Native Android module (Java)</Text>
          <Text style={styles.infoItem}>✅ Deep linking support</Text>
          <Text style={styles.infoItem}>✅ Local notification storage</Text>
          <Text style={styles.infoItem}>✅ Badge count management</Text>
          <Text style={styles.infoItem}>✅ Android 15 compatibility</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25d366',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tokenContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tokenLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#25d366',
  },
  secondaryButton: {
    backgroundColor: '#128c7e',
  },
  accentButton: {
    backgroundColor: '#075e54',
  },
  warningButton: {
    backgroundColor: '#ff6b6b',
  },
  infoButton: {
    backgroundColor: '#4ecdc4',
  },
  navigationButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
});

export default HomeScreen;
