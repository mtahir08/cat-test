import React from "react";
import {
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

import styles from "./styles";

type Props = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
  type?: "primary" | "secondary";
  titleStyle?: StyleProp<TextStyle>;
  containerStyles?: StyleProp<ViewStyle>;
};

const Button: React.FC<Props> = ({
  onPress,
  title,
  type = "primary",
  titleStyle = {},
  containerStyles = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        type === "primary" ? styles.primaryBtn : styles.secondaryBtn,
        containerStyles,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
