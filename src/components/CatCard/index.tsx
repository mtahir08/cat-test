import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Toast from 'react-native-toast-message';


import Button from '../Button';

import useAPI from '../../hooks/useAPI';
import { shareURL } from '../../services';
import { AuthContext } from '../../context/AuthContext';

import { RESPONSE_TYPE } from '../../constants';

import { ROUTE_NAMES } from '../../constants/routes';

import styles from './styles';
import useCustomNavigation from '../../hooks/useNavigate';

type Props = {
  uri: string;
  id: number;
};

const CatCard: React.FC<Props> = ({ id, uri }) => {
  const { navigate } = useCustomNavigation();

  const { post, data, isLoading, isError } = useAPI('/favourites');
  const { userInfo } = React.useContext(AuthContext);

  const onPress = () => {
    navigate(ROUTE_NAMES.DETAILS, { id });
  };

  const markFavourite = React.useCallback(() => {
    post('/favourites', {
      image_id: id,
      sub_id: userInfo.id,
    });
  }, [data, isLoading, isError]);

  if (isError)
    Toast.show({
      type: 'error',
      text1: 'Ops! Some error occurred',
    });

  if (data?.message === RESPONSE_TYPE.SUCCESS)
    Toast.show({
      type: 'success',
      text1: 'Successfully marked as favourite',
    });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessible={true}
      accessibilityLabel='Image card'
    >
      <Image
        style={styles.image}
        source={{ uri }}
        accessible={true}
        accessibilityRole='image'
        accessibilityLabel='Image'
      />
      <Button
        onPress={markFavourite}
        title='Mark as favourite'
        containerStyles={styles.btn}
        accessibilityLabel='Mark as favorite'
      />
      <Button
        title='Share'
        type='secondary'
        onPress={() => shareURL(uri)}
        containerStyles={styles.btn}
        accessibilityLabel='Share'
      />
    </TouchableOpacity>
  );
};

export default CatCard;
