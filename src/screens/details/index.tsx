import React from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import useAPI from '../../hooks/useAPI';

import ErrorScreen from '../../components/ErrorScreen';
import FullScreenLoader from '../../components/FullScreenLoader';

import { ROUTE_NAMES } from '../../constants/routes';

import { RouteParams } from '../../types/routes';

import styles from './styles';

import { dummyDescription } from '../../constants';
import CardButtons from '../../components/CatCard/CardButtons';

const Details: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, ROUTE_NAMES.DETAILS>>();
  const { get, data, isLoading, isError } = useAPI();

  React.useEffect(() => {
    get(`/images/${route.params.id}/analysis`);
  }, [route.params.id]);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  const { vendor, created_at, image_id, labels } = data?.[0] || {}; // Assuming data structure has title, description, and images properties
  const uri = route.params.uri;
  const description = dummyDescription;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{vendor}</Text>
        <Text style={styles.info}>
          Created At: {new Date(created_at).toDateString()}
        </Text>
        <Text style={styles.description}>{description}</Text>
        {labels && labels.length > 0 && (
          <View style={styles.labelContainer}>
            {labels.map((label, index) => (
              <Text key={index} style={styles.label}>
                {label.Name}
              </Text>
            ))}
          </View>
        )}
      </View>
      <CardButtons
        id={route.params?.id}
        uri={uri}
        containerStyles={styles.buttonContainer}
        btnStyles={styles.btn}
      />
    </View>
  );
};

export default Details;
