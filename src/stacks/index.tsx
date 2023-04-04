import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ROUTE_NAMES } from "../constants/routes";
import Listings from "../screens/Listings";
import Home from "../screens/home";
import Login from "../screens/login";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name={ROUTE_NAMES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.HOME}
        component={Home}
        options={{
          headerTitle: "Categories",
        }}
      />
      <Stack.Screen name={ROUTE_NAMES.LISTINGS} component={Listings} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
