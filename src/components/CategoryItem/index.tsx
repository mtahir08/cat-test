import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { ROUTE_NAMES } from '../../constants/routes';

import styles from './styles';
import useCustomNavigation from '../../hooks/useNavigate';

type Props = {
  id: number;
  title: string;
};

const CategoryItem: React.FC<Props> = ({ title, id }) => {
  const { navigate } = useCustomNavigation();

  const onPress = () => {
    navigate(ROUTE_NAMES.LISTINGS, { id });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityRole='button'
      accessibilityLabel={title}
      accessibilityHint='Press click category'
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
