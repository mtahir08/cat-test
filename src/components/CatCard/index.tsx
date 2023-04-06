import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { ROUTE_NAMES } from '../../constants/routes';

import { FavoritesContext } from '../../context/FavoritesContext';
import useCustomNavigation from '../../hooks/useNavigate';

import styles from './styles';
import CardButtons from './CardButtons';

type Props = {
  uri: string;
  id: number;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const { navigate } = useCustomNavigation();

  const { favorites, markFavourite, unmarkFavourite } =
    React.useContext(FavoritesContext);

  const onDetailsPress = () => navigate(ROUTE_NAMES.DETAILS, { id, uri });

  const isFavoriteIndex = favorites.findIndex(
    (obj) => obj?.image_id === id.toString()
  );

  const toggleFavourite = () => {
    if (isFavoriteIndex > -1) {
      unmarkFavourite(
        favorites?.[isFavoriteIndex]?.id?.toString(),
        id.toString()
      );
    } else {
      markFavourite(id.toString());
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onDetailsPress}>
      <Image source={{ uri }} style={styles.image} />
      <CardButtons id={id} uri={uri} />
    </TouchableOpacity>
  );
};

export default CatCard;
