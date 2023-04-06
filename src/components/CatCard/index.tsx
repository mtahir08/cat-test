import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Button from '../Button';

import { shareURL } from '../../services/share';

import { ROUTE_NAMES } from '../../constants/routes';

import { FavoritesContext } from '../../context/FavoritesContext';
import useCustomNavigation from '../../hooks/useNavigate';

import styles from './styles';

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
      <Button
        onPress={toggleFavourite}
        containerStyles={styles.btn}
        title={`${isFavoriteIndex > -1 ? 'Unmark' : 'Mark'} as favourite`}
      />
      <Button
        title='Share'
        type='secondary'
        onPress={() => shareURL(uri)}
        containerStyles={styles.btn}
      />
    </TouchableOpacity>
  );
};

export default CatCard;
