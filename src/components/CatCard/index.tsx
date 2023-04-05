import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Button from "../Button";

import { shareURL } from "../../services";

import { RouteParams } from "../../types/routes";

import { ROUTE_NAMES } from "../../constants/routes";

import styles from "./styles";
import { FavoritesContext } from "../../context/FavoritesContext";

type Props = {
  uri: string;
  id: number;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const { favorites, markFavourite, unmarkFavourite } =
    React.useContext(FavoritesContext);
  const isFavoriteIndex = favorites.findIndex(
    (obj) => obj.image_id === id.toString()
  );

  const onPress = () => {
    navigation.navigate(ROUTE_NAMES.DETAILS, { id, uri });
  };

  const onPressUnmarkFavourite = () => {
    unmarkFavourite(favorites[isFavoriteIndex].id.toString(), id.toString());
  };

  const onPressMarkFavourite = () => {
    markFavourite(id.toString());
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
      <Button
        onPress={
          isFavoriteIndex > -1
            ? () => onPressUnmarkFavourite()
            : () => onPressMarkFavourite()
        }
        title={`${isFavoriteIndex > -1 ? "Unmark" : "Mark"} as favourite`}
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
