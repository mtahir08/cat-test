import React from 'react';
import { Text, View } from 'react-native';

const ErrorScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Ops! Some error occurred</Text>
    </View>
  );
};

export default ErrorScreen;
