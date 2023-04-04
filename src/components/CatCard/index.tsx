import React from "react";
import { View, Image } from "react-native";
import Toast from "react-native-toast-message";
import { RESPONSE_TYPE } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

import useAPI from "../../hooks/useAPI";
import { shareURL } from "../../services";

import Button from "../Button";
import ErrorScreen from "../ErrorScreen";
import FullScreenLoader from "../FullScreenLoader";

import styles from "./styles";

type Props = {
  uri: string;
  id: string;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const { post, data, isLoading, isError } = useAPI("/favourites");
  const { userInfo } = React.useContext(AuthContext);

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
    <View style={styles.container}>
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
    </View>
  );
};

export default CatCard;
