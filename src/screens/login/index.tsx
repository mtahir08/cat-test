import React from "react";
import { View, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

import Cat from "../../assets/cat-login.png";

import Button from "../../components/Button";

import { AuthContext } from "../../context/AuthContext";

import styles from "./styles";

WebBrowser.maybeCompleteAuthSession();

const Login: React.FC = () => {
  const { onLogin } = React.useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const onPressLogin = async () => {
    setIsLoggingIn(true);
    await onLogin();
    setIsLoggingIn(false);
  };

  return (
    <View style={styles.container}>
      <Image source={Cat} style={styles.image} />
      <Button
        title="LOGIN OR SIGNUP"
        onPress={onPressLogin}
        disabled={isLoggingIn}
        containerStyles={styles.loginBtn}
      />
    </View>
  );
};

export default Login;
