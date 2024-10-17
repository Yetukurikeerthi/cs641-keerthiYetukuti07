
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App'; // Change from App.txs to App (assuming it's a .tsx file)
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';

const AppComponent = () => (
  <NavigationContainer>
    <App />
  </NavigationContainer>
);

// Register the AppComponent instead of just App
AppRegistry.registerComponent(appName, () => AppComponent);
