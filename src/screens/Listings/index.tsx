import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import useListings from '../../hooks/useListings';

import CatCard from '../../components/CatCard';
import ErrorScreen from '../../components/ErrorScreen';
import FullScreenLoader from '../../components/FullScreenLoader';

import { ROUTE_NAMES } from '../../constants/routes';

import { RouteParams } from '../../types/routes';

import styles from './styles';
const numColumns = 2;

const Listings: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, ROUTE_NAMES.LISTINGS>>();

  const { dataToShow, isLoading, isError, onEndReached } = useListings(
    route.params.id
  );

  const renderItem = ({ item }) => (
    <CatCard uri={item.url} id={item?.id} key={item.id} />
  );

  const renderFooter = () => {
    if (isLoading && dataToShow.length) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  if (isLoading && !dataToShow.length) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <FlatList
      data={dataToShow}
      renderItem={renderItem}
      numColumns={numColumns}
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      columnWrapperStyle={styles.container}
      keyExtractor={(item, index) => `${item?.id?.toString()}-${index}`}
    />
  );
};

export default Listings;
