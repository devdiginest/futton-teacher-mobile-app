import React, { Fragment }      from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home                     from './Home';
import Classroom                from './Classroom';

const HomeStack = createStackNavigator();

export default function HomeStackRouter({ navigation }) {
  return (
    <Fragment>
      <HomeStack.Navigator>
        <HomeStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <HomeStack.Screen name="Classroom" component={Classroom} />
      </HomeStack.Navigator>
    </Fragment>
  );
}
