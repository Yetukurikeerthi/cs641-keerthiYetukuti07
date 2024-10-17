import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Keerthi Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Hometwo")}>
        <Text>Go to different page</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
