import React from "react";
import { ActivityIndicator, View } from "react-native";

const FullScreenLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default FullScreenLoader;
