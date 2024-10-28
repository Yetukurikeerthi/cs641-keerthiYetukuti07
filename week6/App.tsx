import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RefreshControlExample from './components/RefreshControlExample';
import FlatListExample from './components/FlatListExample';
import Modal from './components/Modal';
import MyImage from './components/MyImage'; // Import MyImage component

const App = () => {
  const [displayText, setDisplayText] = useState('');

  function longPressButton() {
    setDisplayText('Long Pressed');
  }

  function showHelperText() {
    setDisplayText('Long press for 3 seconds');
  }

  function hideHelperText() {
    setDisplayText('');
  }

  return (
    <View style={styles.container}> {/* Added View container for layout */}
      <StatusBar style="auto" />
      <RefreshControlExample />
      {/* <FlatListExample /> 
       <Modal /> 
      <MyImage /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

export default App;
