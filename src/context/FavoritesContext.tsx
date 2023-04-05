import React from "react";
import Toast from "react-native-toast-message";

import { Favourite } from "../types";

import useAPI from "../hooks/useAPI";
import { AuthContext } from "./AuthContext";

import { RESPONSE_TYPE } from "../constants";

type FavoritesContextType = {
  favorites: Favourite[];
  setFavorites: React.Dispatch<React.SetStateAction<any[]>>;
  markFavourite: (id: string) => void;
  unmarkFavourite: (favoriteId: string, imageId: string) => void;
};

const DEFAULT_CONTEXT = {
  favorites: [],
  setFavorites: () => {},
  markFavourite: () => {},
  unmarkFavourite: () => {},
};

type props = {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

const FavoritesContext =
  React.createContext<FavoritesContextType>(DEFAULT_CONTEXT);

const FavoritesProvider: React.FC<props> = (props) => {
  const { get: getMarkedFavorites, data: favoritesData } = useAPI();
  const { post: addFavorite, data: markData, isError } = useAPI("/favourites");
  const {
    del: deleteFavorite,
    data: unMarkData,
    isError: isUnMarkError,
  } = useAPI("/favourites/:favourite_id");

  const markFavourite = (id: string) => {
    addFavorite(
      "/favourites",
      { image_id: id, sub_id: userInfo.id },
      { image_id: id }
    );
  };

  const unmarkFavourite = (favoriteId: string, imageId: string) => {
    deleteFavorite(`/favourites/${favoriteId}`, {
      image_id: imageId,
      sub_id: userInfo.id,
    });
    const favoritesCopy = [...favorites];
    const index = favorites.findIndex((obj) => obj.image_id === imageId);
    favoritesCopy.splice(index, 1);
    setFavorites(favoritesCopy);
  };

  if (isError || isUnMarkError)
    Toast.show({
      type: "error",
      text1: "Ops! Some error occurred",
    });

  if (markData?.message === RESPONSE_TYPE.SUCCESS)
    Toast.show({
      type: "success",
      text1: "Successfully marked as favourite",
    });

  if (unMarkData?.message === RESPONSE_TYPE.SUCCESS)
    Toast.show({
      type: "success",
      text1: "Successfully unmarked as favourite",
    });

  const [favorites, setFavorites] = React.useState([]);
  const { userInfo } = React.useContext(AuthContext);

  const getFavorites = async () => {
    await getMarkedFavorites(`/favourites?${userInfo.id}`);
  };

  React.useEffect(() => {
    if (userInfo) getFavorites();
  }, [JSON.stringify(userInfo)]);

  React.useEffect(() => {
    if (favoritesData) setFavorites(favoritesData);
  }, [JSON.stringify(favoritesData)]);

  React.useEffect(() => {
    if (markData) {
      const favoritesCopy = [...favorites];
      favoritesCopy.push({
        id: markData.id,
        image_id: markData.image_id,
      });
      setFavorites(favoritesCopy);
    }
  }, [JSON.stringify(markData)]);

  const contextValues = {
    favorites,
    setFavorites,
    markFavourite,
    unmarkFavourite,
  };

  return (
    <FavoritesContext.Provider value={contextValues}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };
export default FavoritesProvider;
