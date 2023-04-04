import React from "react";
import { View, Image } from "react-native";

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

  const markFavourite = React.useCallback(() => {
    post("/favourites", {
      image_id: id,
      sub_id: "my-user-1234",
    });
  }, [data, isLoading, isError]);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

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
