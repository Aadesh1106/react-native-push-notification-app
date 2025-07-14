/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Initialize Firebase service
import './src/services/FirebaseService';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
