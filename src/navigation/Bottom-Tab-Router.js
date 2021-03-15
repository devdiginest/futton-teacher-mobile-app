import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { logout } from '../actions/Auth';
import Home from '../screens/Home';
import MyCourses from '../screens/MyCourses';
import Messages from "../screens/Messages"
import MyTestAndQuiz from "../screens/MyTestAndQuiz"
import Profile from "../screens/Profile"

import _ from "lodash"

const Tab = createBottomTabNavigator();

export default function BottomTabRouter(navProps) {
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
        labelStyle: { fontSize: 12 },
        keyboardHidesTabBar: true,

      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon type="antdesign" name="appstore-o" color={color} size={20} />
            /*  <Image
               source={focused ? require('../../assets/icon-btab-homea.png') : require('../../assets/icon-btab-homei.png')}
               style={{ width: 20, height: 20 }} /> */
          )
        }} />
      <Tab.Screen
        name="My Courses"
        component={MyCourses}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon type="simple-line-icon" name="notebook" color={color} size={20} />
            /* <Image
                source={focused ? require('../../assets/icon-btab-mycoursesa.png') : require('../../assets/icon-btab-mycoursesi.png')}
                style={{ width: 18, height: 22 }} /> */
          )
        }} />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon type="ionicon" name="ios-chatbubbles-outline" color={color} size={24} />
            /* <Image
              source={focused ? require('../../assets/icon-btab-messagesa.png') : require('../../assets/icon-btab-messagesi.png')}
              style={{ width: 22, height: 22 }} />
         */ )
        }} />
      <Tab.Screen
        name="Test & Quiz"
        component={MyTestAndQuiz}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon type="antdesign" name="question" color={color} size={30} />
            /*  <Image
               source={focused ? require('../../assets/icon-btab-notificationsa.png') : require('../../assets/icon-btab-notificationsi.png')}
               style={{ width: 15, height: 20 }} /> */
          )
        }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon type="simple-line-icon" name="user" color={color} size={20} />
            /* <Image
              source={focused ? require('../../assets/icon-btab-profilea.png') : require('../../assets/icon-btab-profilei.png')}
              style={{ width: 18, height: 18 }} /> */
          )
        }} />
    </Tab.Navigator>
  );
};
