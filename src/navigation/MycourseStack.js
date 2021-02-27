import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyCourses from '../screens/MyCourses';
import Classroom from '../screens/Classroom';

const HomeStack = createStackNavigator();

export default function HomeStackRouter({ navigation }) {
    return (
        <Fragment>
            <HomeStack.Navigator>
                <HomeStack.Screen options={{ headerShown: false }} name="Home" component={MyCourses} />
                <HomeStack.Screen name="Classroom" component={Classroom} />
            </HomeStack.Navigator>
        </Fragment>
    );
}
