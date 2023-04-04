import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, Image } from "react-native";
import Cat from "../../assets/cat-login.png";
import Button from "../../components/Button";
import styles from "./styles";
import { AuthContext } from "../../context/AuthContext";

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
        containerStyles={styles.loginBtn}
        disabled={isLoggingIn}
      />
    </View>
  );
};

export default Login;
