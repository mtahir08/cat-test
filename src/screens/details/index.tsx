import React from "react";
import { ScrollView } from "react-native";
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

  console.log({ data, isError });

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    ></ScrollView>
  );
};

export default Listings;
