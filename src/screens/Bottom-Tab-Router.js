import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { logout } from '../actions/Auth';
import MessagesStack from '../navigation/MessagesStack';
import HomeStackRouter from '../navigation/Home-Stack';
import ProfileStackRouter from '../navigation/ProfileStack';
import MyCourses from './MyCourses';
import Notifications from './Notifications';

const Tab = createBottomTabNavigator();

export default function BottomTabRouter({ navigation }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.token) {
    return null;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3951B6',
        inactiveTintColor: '#C5CEE0',
        style: { paddingTop: 5, paddingBottom: 10, height: 70 },
        labelStyle: { fontSize: 12 }
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackRouter}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/icon-btab-homea.png') : require('../../assets/icon-btab-homei.png')}
              style={{ width: 20, height: 20 }} />
          )
        }} />
      <Tab.Screen
        name="My Courses"
        component={MyCourses}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/icon-btab-mycoursesa.png') : require('../../assets/icon-btab-mycoursesi.png')}
              style={{ width: 18, height: 22 }} />
          )
        }} />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/icon-btab-messagesa.png') : require('../../assets/icon-btab-messagesi.png')}
              style={{ width: 22, height: 22 }} />
          )
        }} />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/icon-btab-notificationsa.png') : require('../../assets/icon-btab-notificationsi.png')}
              style={{ width: 15, height: 20 }} />
          )
        }} />
      <Tab.Screen
        name="Profile"
        component={ProfileStackRouter}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/icon-btab-profilea.png') : require('../../assets/icon-btab-profilei.png')}
              style={{ width: 18, height: 18 }} />
          )
        }} />
    </Tab.Navigator>
  );
};
