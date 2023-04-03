import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/home";
import React from "react";
import { AUTH_ROUTE_NAMES } from "../../constants/routes";
import Details from "../../screens/Listings";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AUTH_ROUTE_NAMES.HOME} component={Home} />
      <Stack.Screen name={AUTH_ROUTE_NAMES.DETAILS} component={Details} />
    </Stack.Navigator>
  );
};

export default AuthStack;
