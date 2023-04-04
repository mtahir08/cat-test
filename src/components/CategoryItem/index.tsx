import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ROUTE_NAMES } from "../../constants/routes";
import { RouteParams } from "../../types/routes";
import styles from "./styles";

type Props = {
  title: string;
  id: number;
};

const CategoryItem: React.FC<Props> = ({ title, id }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const onPress = () => {
    navigation.navigate(ROUTE_NAMES.LISTINGS, {
      id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
