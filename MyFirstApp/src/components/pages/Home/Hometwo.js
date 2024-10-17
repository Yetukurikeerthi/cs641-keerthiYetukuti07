import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeTwoScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Two Screen</Text>
      <TouchableOpacity onPress={() => navigation.push("Hometwo")}>
        <Text>Go to different page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeTwoScreen;
