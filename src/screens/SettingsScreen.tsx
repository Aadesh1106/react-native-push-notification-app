import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseService from '../services/FirebaseService';

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [testTopic, setTestTopic] = useState('test_notifications');
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    loadSettings();
    loadFcmToken();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('app_settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setNotificationsEnabled(parsedSettings.notificationsEnabled ?? true);
        setSoundEnabled(parsedSettings.soundEnabled ?? true);
        setVibrationEnabled(parsedSettings.vibrationEnabled ?? true);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcmToken');
    if (token) {
      setFcmToken(token);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        notificationsEnabled,
        soundEnabled,
        vibrationEnabled,
      };
      await AsyncStorage.setItem('app_settings', JSON.stringify(settings));
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const subscribeTopic = async () => {
    if (!testTopic.trim()) {
      Alert.alert('Error', 'Please enter a topic name');
      return;
    }

    try {
      await FirebaseService.subscribeToTopic(testTopic);
      Alert.alert('Success', `Subscribed to topic: ${testTopic}`);
    } catch (error) {
      console.error('Error subscribing to topic:', error);
      Alert.alert('Error', 'Failed to subscribe to topic');
    }
  };

  const unsubscribeTopic = async () => {
    if (!testTopic.trim()) {
      Alert.alert('Error', 'Please enter a topic name');
      return;
    }

    try {
      await FirebaseService.unsubscribeFromTopic(testTopic);
      Alert.alert('Success', `Unsubscribed from topic: ${testTopic}`);
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
      Alert.alert('Error', 'Failed to unsubscribe from topic');
    }
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all notifications, settings, and cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'notifications',
                'app_settings',
                'badgeCount',
              ]);
              
              // Reset local state
              setNotificationsEnabled(true);
              setSoundEnabled(true);
              setVibrationEnabled(true);
              
              Alert.alert('Success', 'All data cleared successfully');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const copyTokenToClipboard = () => {
    if (fcmToken) {
      // In a real app, you would use react-native-clipboard or similar
      Alert.alert('FCM Token', fcmToken);
    } else {
      Alert.alert('Error', 'No FCM token available');
    }
  };

  const refreshToken = async () => {
    try {
      const newToken = await FirebaseService.getFCMToken();
      if (newToken) {
        setFcmToken(newToken);
        Alert.alert('Success', 'FCM token refreshed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      Alert.alert('Error', 'Failed to refresh token');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notification Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ccc', true: '#25d366' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#ccc', true: '#25d366' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#ccc', true: '#25d366' }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={saveSettings}>
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FCM Token</Text>
          
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenLabel}>Current Token:</Text>
            <Text style={styles.tokenText} numberOfLines={4}>
              {fcmToken || 'No token available'}
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.halfButton]} 
              onPress={copyTokenToClipboard}>
              <Text style={styles.buttonText}>View Token</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.halfButton]} 
              onPress={refreshToken}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topic Management</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter topic name"
            value={testTopic}
            onChangeText={setTestTopic}
            autoCapitalize="none"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.halfButton, styles.subscribeButton]} 
              onPress={subscribeTopic}>
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.halfButton, styles.unsubscribeButton]} 
              onPress={unsubscribeTopic}>
              <Text style={styles.buttonText}>Unsubscribe</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer Options</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]} 
            onPress={clearAllData}>
            <Text style={styles.buttonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoItem}>Version: 1.0.0</Text>
            <Text style={styles.infoItem}>Build: React Native 0.80.1</Text>
            <Text style={styles.infoItem}>Firebase: @react-native-firebase</Text>
            <Text style={styles.infoItem}>Platform: Android 15 Compatible</Text>
            <Text style={styles.infoItem}>Features: WhatsApp-style notifications</Text>
          </View>
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
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#25d366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tokenContainer: {
    marginBottom: 15,
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
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  halfButton: {
    flex: 1,
    marginTop: 0,
  },
  subscribeButton: {
    backgroundColor: '#128c7e',
  },
  unsubscribeButton: {
    backgroundColor: '#ff6b6b',
  },
  dangerButton: {
    backgroundColor: '#ff4444',
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default SettingsScreen;
