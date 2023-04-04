import React from "react";
import { TouchableOpacity, Image } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Button from "../Button";

import useAPI from "../../hooks/useAPI";
import { shareURL } from "../../services";
import { AuthContext } from "../../context/AuthContext";

import { RESPONSE_TYPE } from "../../constants";

import { RouteParams } from "../../types/routes";

import { ROUTE_NAMES } from "../../constants/routes";

import styles from "./styles";

type Props = {
  uri: string;
  id: number;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const { post, data, isLoading, isError } = useAPI("/favourites");
  const { userInfo } = React.useContext(AuthContext);

  const onPress = () => {
    navigation.navigate(ROUTE_NAMES.DETAILS, { id });
  };

  const markFavourite = React.useCallback(() => {
    post("/favourites", {
      image_id: id,
      sub_id: userInfo.id,
    });
  }, [data, isLoading, isError]);

  if (isError)
    Toast.show({
      type: "error",
      text1: "Ops! Some error occurred",
    });

  if (data?.message === RESPONSE_TYPE.SUCCESS)
    Toast.show({
      type: "success",
      text1: "Successfully marked as favourite",
    });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
      <Button
        onPress={markFavourite}
        title="Mark as favourite"
        containerStyles={styles.btn}
      />
      <Button
        title="Share"
        type="secondary"
        onPress={() => shareURL(uri)}
        containerStyles={styles.btn}
      />
    </TouchableOpacity>
  );
};

export default CatCard;
