import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import customStyle from "../styles/custom";

interface FunctionalComponentProps {
    buttonTitle: string;
    showButton: boolean;
}

const FunctionalComponent = (props: FunctionalComponentProps) => {
    const [count, setCount] = useState(100);
    const [onScreenTimer, setOnScreenTimer] = useState(0);
    const [dummyText, setDummyText] = useState('Initial');

    function increase() {
        setCount(count + 1);
    }

    const users = [
        { firstName: 'Keerthi', lastName: 'Yetukuri' },
    ];

    function handleButtonPress() {
        setDummyText('Button pressed');
    }

    function decrease() {
        setCount(count - 1);
    }

    useEffect(() => {
        const value = setInterval(() => setOnScreenTimer((onScreenTimer) => onScreenTimer + 2), 2000);
        return () => clearInterval(value);
    }, []);

    return (
        <View style={customStyle.container}>
            <Text>Time on screen: {onScreenTimer}</Text>
            <Text>{dummyText}</Text>
            {users.map((user, index) => (
                <Text key={index}>{user.lastName}, {user.firstName}</Text> // Added key prop here
            ))}
            <Button title={props.buttonTitle} onPress={increase} disabled />
            {props.showButton ? (
                <Button title={props.buttonTitle} onPress={handleButtonPress} />
            ) : (
                <Text>Ternary False</Text>
            )}
        </View>
    );
}

export default FunctionalComponent;
