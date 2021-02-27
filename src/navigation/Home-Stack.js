import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Classroom from '../screens/Classroom';

const HomeStack = createStackNavigator();

export default function HomeStackRouter({ navigation }) {
  return (
    <Fragment>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Classroom" component={Classroom} />
      </HomeStack.Navigator>
    </Fragment>
  );
}
