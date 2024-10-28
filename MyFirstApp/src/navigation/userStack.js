import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import CallScreen from "../screens/Call";
import SettingsScreen from "../screens/Settings";
import Feather from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0e1529" },
        sceneContainerStyle: { backgroundColor: "#0e1529" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              color={focused ? "white" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Call"
        component={CallScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="users"
              color={focused ? "white" : "gray"}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen} // Correctly set the component for the tab
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              color={focused ? "white" : "gray"}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
