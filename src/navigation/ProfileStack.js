import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import DailyReport from '../screens/DailyReport';
import AddReport from "../screens/AddReport"
import StudentList from "../screens/StudentList"


const ProfileStack = createStackNavigator();

export default function ProfileStackRouter({ navigation }) {
    return (
        <Fragment>
            <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
                <ProfileStack.Screen name="Profile" component={Profile} />
                <ProfileStack.Screen name="DailyReport" component={DailyReport} />
                <ProfileStack.Screen name="AddReport" component={AddReport} />
                <ProfileStack.Screen name="StudentList" component={StudentList} />
            </ProfileStack.Navigator>
        </Fragment>
    );
}
