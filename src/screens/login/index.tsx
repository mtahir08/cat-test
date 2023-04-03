import React from "react";
import { View, Image } from "react-native";
import Cat from "../../assets/cat-login.png";
import Button from "../../components/Button";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AUTH_ROUTE_NAMES } from "../../constants/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "../../types/routes";

const Login: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const onPressLogin = () => {
    navigation.navigate(AUTH_ROUTE_NAMES.HOME);
  };

  return (
    <View style={styles.container}>
      <Image source={Cat} style={styles.image} />
      <Button
        title="LOGIN"
        onPress={onPressLogin}
        containerStyles={styles.loginBtn}
      />
      <Button
        title="SIGNUP"
        onPress={() => {}}
        type="secondary"
        containerStyles={styles.signupBtn}
      />
    </View>
  );
};

export default Login;
