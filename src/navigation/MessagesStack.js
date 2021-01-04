import React                    from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Messages                 from '../screens/Messages';
import Chat                     from '../screens/Chat';

const Stack = createStackNavigator();

export default function MessagesStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Messages" component={Messages} />
      <Stack.Screen options={{ headerShown: false }} name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
