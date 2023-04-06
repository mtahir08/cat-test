import React from 'react';
import { View } from 'react-native';

import Button from '../Button';

import { shareURL } from '../../services/share';

import { FavoritesContext } from '../../context/FavoritesContext';

import styles from './styles';

type Props = {
  uri: string;
  id: number;
  containerStyles?: any;
  btnStyles?: any;
};

const CardButtons: React.FC<Props> = ({
  id,
  uri,
  containerStyles,
  btnStyles,
}) => {
  const { favorites, markFavourite, unmarkFavourite } =
    React.useContext(FavoritesContext);

  const isFavoriteIndex = React.useMemo(
    () => favorites.findIndex((obj) => obj?.image_id === id.toString()),
    [favorites, id]
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
    <View style={containerStyles}>
      <Button
        onPress={toggleFavourite}
        containerStyles={[styles.btn, btnStyles]}
        title={`${isFavoriteIndex > -1 ? 'Unmark' : 'Mark'} as favourite`}
      />
      <Button
        title='Share'
        type='secondary'
        onPress={() => shareURL(uri)}
        containerStyles={[styles.btn, btnStyles]}
      />
    </View>
  );
};

export default CardButtons;
