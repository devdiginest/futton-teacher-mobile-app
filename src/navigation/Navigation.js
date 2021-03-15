import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/Forgot-Password';
import ResetPassword from '../screens/Reset-Password';
import BottomTabRouter from './Bottom-Tab-Router';
import Classroom from "../screens/Classroom"
import Notifications from "../screens/Notifications"
import Chat from '../screens/Chat';
import TestDetails from "../screens/TestDetails"
import DailyReport from "../screens/DailyReport"
import AddReport from "../screens/AddReport"
import StudentList from "../screens/StudentList"
import StudentDetails from "../screens/StudentDetails"
import ChatInfo from "../screens/ChatInfo"
import PDFViewer from "../screens/PDFViewer"
import VideoDisplay from "../screens/VideoDisplay"

const Stack = createStackNavigator();

export default function Navigation(props) {
  const auth = useSelector(state => state.auth);
  const userToken = auth.token ? auth.token : null;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {
        userToken === null ? (
          <Fragment>
            <Stack.Screen name="SignIn" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="BottomTabRouter" component={BottomTabRouter} />
            <Stack.Screen name="Classroom" component={Classroom} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="TestDetails" component={TestDetails} />
            <Stack.Screen name="DailyReport" component={DailyReport} />
            <Stack.Screen name="AddReport" component={AddReport} />
            <Stack.Screen name="StudentList" component={StudentList} />
            <Stack.Screen name="StudentDetails" component={StudentDetails} />
            <Stack.Screen name="ChatInfo" component={ChatInfo} />
            <Stack.Screen name="PDFViewer" component={PDFViewer} />
            <Stack.Screen name="VideoDisplay" component={VideoDisplay} />
          </Fragment>
        )
      }
    </Stack.Navigator>
  );
}
