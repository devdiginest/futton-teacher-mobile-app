import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Forgot-Password';
import ResetPassword from '../screens/Reset-Password';
import BottomTabRouter from '../screens/Bottom-Tab-Router';

const Stack = createStackNavigator();

export default function Navigation(props) {
  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;

  return (
    <Stack.Navigator>
      {
        userToken === null ? (
          <Fragment>
            <Stack.Screen options={{ headerShown: false }} name="SignIn" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
          </Fragment>
        ) : (
            <Stack.Screen options={{ headerShown: false }} name="BottomTabRouter" component={BottomTabRouter} />
          )
      }
    </Stack.Navigator>
  );
}
