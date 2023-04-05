import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import useAPI from "../../hooks/useAPI";

import ErrorScreen from "../../components/ErrorScreen";
import FullScreenLoader from "../../components/FullScreenLoader";

import { ROUTE_NAMES } from "../../constants/routes";

import { RouteParams } from "../../types/routes";

import styles from "./styles";

const Listings: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, ROUTE_NAMES.DETAILS>>();
  const { get, data, isLoading, isError } = useAPI();

  React.useEffect(() => {
    get(`/images/${route.params.id}/analysis`);
  }, [route.params.id]);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: route.params.uri }} style={styles.img} />
      <View style={styles.labelsContainer}>
        {data &&
          data[0]?.labels?.map((item) => {
            return <Text style={styles.label}>{item.Name}</Text>;
          })}
      </View>
    </ScrollView>
  );
};

export default Listings;
