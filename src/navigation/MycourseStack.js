import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyCourses from '../screens/MyCourses';
import Classroom from '../screens/Classroom';

const HomeStack = createStackNavigator();

export default function MycourseStack({ navigation }) {
    return (
        <Fragment>
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="MyCourses" component={MyCourses} />
                <HomeStack.Screen name="Classroom" component={Classroom} />
            </HomeStack.Navigator>
        </Fragment>
    );
}
