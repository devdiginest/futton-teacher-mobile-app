import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TestDetails from '../screens/TestDetails';
import MyTestAndQuiz from '../screens/MyTestAndQuiz';

const HomeStack = createStackNavigator();

export default function MyTestAndQuizzStack({ navigation }) {
    return (
        <Fragment>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="MyTestAndQuiz" component={MyTestAndQuiz} />
                <HomeStack.Screen name="TestDetails" component={TestDetails} />
            </HomeStack.Navigator>
        </Fragment>
    );
}
