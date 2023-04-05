import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Button from "../Button";

import { shareURL } from "../../services/share";

import { RouteParams } from "../../types/routes";

import { ROUTE_NAMES } from "../../constants/routes";

import { FavoritesContext } from "../../context/FavoritesContext";

import styles from "./styles";

type Props = {
  uri: string;
  id: number;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const { favorites, markFavourite, unmarkFavourite } =
    React.useContext(FavoritesContext);

  const onDetailsPress = () =>
    navigation.navigate(ROUTE_NAMES.DETAILS, { id, uri });

  const isFavoriteIndex = favorites.findIndex(
    (obj) => obj?.image_id === id.toString()
  );

  const toggleFavourite = () => {
    if (isFavoriteIndex > -1) {
      unmarkFavourite(
        favorites?.[isFavoriteIndex]?.id.toString(),
        id.toString()
      );
    } else {
      markFavourite(id.toString());
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onDetailsPress}>
      <Image source={{ uri }} style={styles.image} />
      <Button
        onPress={toggleFavourite}
        containerStyles={styles.btn}
        title={`${isFavoriteIndex > -1 ? "Unmark" : "Mark"} as favourite`}
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
