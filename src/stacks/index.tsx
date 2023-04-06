import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTE_NAMES } from '../constants/routes';

import Home from '../screens/home';
import Login from '../screens/login';
import Details from '../screens/details';
import Listings from '../screens/Listings';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name={ROUTE_NAMES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.HOME}
        component={Home}
        options={{
          title: 'Categories',
        }}
      />
      <Stack.Screen
        name={ROUTE_NAMES.LISTINGS}
        component={Listings}
        options={{
          title: 'Lists',
        }}
      />
      <Stack.Screen name={ROUTE_NAMES.DETAILS} component={Details} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
