import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/loginScreen";
import UserDetailsScreen from "../screens/userDetails";
import { MainStackParams } from "../types/types";

// Create a Stack Navigator
const Stack = createStackNavigator<MainStackParams>();

const MainStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ gestureEnabled: true }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainStackNavigator;
