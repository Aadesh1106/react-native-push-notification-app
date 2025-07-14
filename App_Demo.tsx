/**
 * Minimal React Native Push Notification App for Demo
 * This version can run without Android Studio for demonstration purposes
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const [fcmToken, setFcmToken] = useState<string>('');
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    // Initialize Firebase service if available
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    try {
      // This would normally initialize Firebase
      console.log('Notification service initialized');
      setFcmToken('demo-fcm-token-' + Date.now());
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  const showLocalNotification = () => {
    Alert.alert(
      'Local Notification',
      'This would show a local notification in a real device!',
      [{ text: 'OK' }]
    );
    setNotificationCount(prev => prev + 1);
  };

  const showNativeNotification = () => {
    Alert.alert(
      'Native Android Notification',
      'This would trigger the custom Java module notification!',
      [{ text: 'OK' }]
    );
    setNotificationCount(prev => prev + 1);
  };

  const simulateRemoteNotification = () => {
    Alert.alert(
      'Remote Notification Simulation',
      'This would simulate a notification from Firebase!',
      [{ text: 'OK' }]
    );
    setNotificationCount(prev => prev + 1);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    Alert.alert('Success', 'All notifications cleared!');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>📱 WhatsApp Style Notifications</Text>
          <Text style={styles.subtitle}>React Native Internship Demo</Text>
        </View>

        {notificationCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              🔔 Notifications: {notificationCount}
            </Text>
          </View>
        )}

        <View style={styles.tokenContainer}>
          <Text style={styles.sectionTitle}>FCM Token:</Text>
          <Text style={styles.tokenText}>{fcmToken || 'Loading...'}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={showLocalNotification}>
            <Text style={styles.buttonText}>📢 Show Local Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={showNativeNotification}>
            <Text style={styles.buttonText}>🤖 Show Native Android Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.accentButton]} onPress={simulateRemoteNotification}>
            <Text style={styles.buttonText}>☁️ Simulate Remote Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={clearNotifications}>
            <Text style={styles.buttonText}>🗑️ Clear All Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>✅ Features Implemented:</Text>
          <Text style={styles.featureItem}>📱 React Native App with TypeScript</Text>
          <Text style={styles.featureItem}>🔥 Firebase Cloud Messaging Integration</Text>
          <Text style={styles.featureItem}>💚 WhatsApp-style Notifications</Text>
          <Text style={styles.featureItem}>☕ Native Android Module (Java)</Text>
          <Text style={styles.featureItem}>🔗 Deep Linking Support</Text>
          <Text style={styles.featureItem}>💾 Local Notification Storage</Text>
          <Text style={styles.featureItem}>🔢 Badge Count Management</Text>
          <Text style={styles.featureItem}>🤖 Android 15 Compatibility</Text>
        </View>

        <View style={styles.setupContainer}>
          <Text style={styles.sectionTitle}>⚙️ Setup Status:</Text>
          <Text style={styles.setupItem}>📦 React Native: ✅ Ready</Text>
          <Text style={styles.setupItem}>🔥 Firebase Config: ⚠️ Needs Setup</Text>
          <Text style={styles.setupItem}>🤖 Android SDK: ⚠️ Needs Installation</Text>
          <Text style={styles.setupItem}>📱 Emulator/Device: ⚠️ Needs Connection</Text>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>🚀 Next Steps:</Text>
          <Text style={styles.instructionItem}>1. Install Android Studio</Text>
          <Text style={styles.instructionItem}>2. Set up Android SDK</Text>
          <Text style={styles.instructionItem}>3. Configure Firebase</Text>
          <Text style={styles.instructionItem}>4. Run on device/emulator</Text>
          <Text style={styles.instructionItem}>5. Test push notifications</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#25d366',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  badgeContainer: {
    backgroundColor: '#ff4444',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tokenContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  setupContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  instructionsContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
  setupItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
  instructionItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    paddingLeft: 10,
  },
});

export default App;
