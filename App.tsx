/**
 * React Native Push Notification App
 * WhatsApp-style notifications with Firebase
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import NotificationScreen from './src/screens/NotificationScreen';
// Temporarily comment out problematic import and create a simple component
// import SettingsScreen from './src/screens/SettingsScreen';

import { View, Text, StyleSheet } from 'react-native';

// Temporary simple SettingsScreen component
const SettingsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Settings Screen</Text>
    <Text style={styles.subText}>This will be replaced with the full component once build issues are resolved</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'WhatsApp Style Notifications',
            headerStyle: {
              backgroundColor: '#25d366',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationScreen}
          options={{
            title: 'Notifications',
            headerStyle: {
              backgroundColor: '#25d366',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#25d366',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
