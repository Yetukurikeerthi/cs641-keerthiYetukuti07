import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.ts to start build on your app!Keerthi</Text>
      <Text></Text>
      <StatusBar style="auto" />
      <ActivityIndicator size="large" />
    </View>
  );
}
// const doesnt change after assignment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
