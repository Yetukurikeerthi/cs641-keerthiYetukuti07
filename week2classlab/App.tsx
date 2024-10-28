import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import FunctionalComponent from './components/FunctionalComponent';



const App = () => {
  return (
    <ScrollView>
      <Text>Text 1</Text>
      <Text>Text 2</Text>
      <ActivityIndicator></ActivityIndicator>
      <FunctionalComponent buttonTitle={'One'} showButton={true} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 500,
    height: 500,
  },
});


export default App;