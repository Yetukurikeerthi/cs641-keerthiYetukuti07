import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is home screen</Text>
            <Button title={"Settings"} onPress={() => navigation.navigate('Settings')} />
        </View>
    );
}

function Settings({ navigation }) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Feed} />
            <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
    );
}

function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is profile screen</Text>
        </View>
    );
}

function Tags({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is tags screen</Text>
        </View>
    )
}


function Feed() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Tags" component={Tags} />
        </Tab.Navigator>
    );
}

function Article() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen</Text>
        </View>
    );
}



export default function App() {
    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
