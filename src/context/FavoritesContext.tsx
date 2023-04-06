import React, { useMemo, useState, useEffect, useContext } from 'react';
import Toast from 'react-native-toast-message';

import { Favourite } from '../types';
import useAPI from '../hooks/useAPI';
import { AuthContext } from './AuthContext';
import { RESPONSE_TYPE } from '../constants';
import { favourites } from '../constants/api';

interface FavoritesContextType {
  favorites: Favourite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favourite[]>>;
  markFavourite: (id: string) => void;
  unmarkFavourite: (favoriteId: string, imageId: string) => void;
}

const DEFAULT_CONTEXT: FavoritesContextType = {
  favorites: [],
  setFavorites: () => {},
  markFavourite: () => {},
  unmarkFavourite: () => {},
};

interface Props {
  children?: React.ReactNode;
}

const FavoritesContext =
  React.createContext<FavoritesContextType>(DEFAULT_CONTEXT);

const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Favourite[]>([]);
  const { get: getMarkedFavorites, data: favoritesData } = useAPI();
  const {
    post: addFavorite,
    data: markData,
    isError: isMarkError,
  } = useAPI('/favourites');
  const {
    del: deleteFavorite,
    data: unMarkData,
    isError: isUnMarkError,
  } = useAPI(favourites.delete);

  const markFavourite = (id: string) => {
    addFavorite(
      favourites.get,
      { image_id: id, sub_id: userInfo.id },
      { image_id: id }
    );
  };

  const unmarkFavourite = (favoriteId: string, imageId: string) => {
    deleteFavorite(`${favourites.get}/${favoriteId}`, {
      image_id: imageId,
      sub_id: userInfo.id,
    });
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.image_id === imageId
    );
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    if (userInfo) {
      const fetchFavorites = async () => {
        await getMarkedFavorites(`${favourites.get}?${userInfo.id}`);
      };
      fetchFavorites();
    }
  }, [userInfo, getMarkedFavorites]);

  useEffect(() => {
    if (favoritesData) setFavorites(favoritesData);
  }, [favoritesData]);

  useEffect(() => {
    if (markData) {
      const updatedFavorites = [
        ...favorites,
        { ...markData, id: markData.id, image_id: markData.image_id },
      ];
      setFavorites(updatedFavorites);
    }
  }, [markData, favorites]);

  useEffect(() => {
    if (isMarkError || isUnMarkError) {
      Toast.show({
        type: 'error',
        text1: 'Ops! Some error occurred',
      });
    } else if (markData?.message === RESPONSE_TYPE.SUCCESS) {
      Toast.show({
        type: 'success',
        text1: 'Successfully marked as favourite',
      });
    } else if (unMarkData?.message === RESPONSE_TYPE.SUCCESS) {
      Toast.show({
        type: 'success',
        text1: 'Successfully unmarked as favourite',
      });
    }
  }, [isMarkError, isUnMarkError, markData, unMarkData]);

  const contextValues = useMemo<FavoritesContextType>(
    () => ({
      favorites,
      setFavorites,
      markFavourite,
      unmarkFavourite,
    }),
    [favorites, markFavourite, setFavorites, unmarkFavourite]
  );
  return (
    <FavoritesContext.Provider value={contextValues}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };
export default FavoritesProvider;
