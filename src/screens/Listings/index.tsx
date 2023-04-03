import React from "react";
import { ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import useAPI from "../../hooks/useAPI";

import CatDetails from "../../components/CatCard";
import ErrorScreen from "../../components/ErrorScreen";
import { AUTH_ROUTE_NAMES } from "../../constants/routes";
import FullScreenLoader from "../../components/FullScreenLoader";

import { RouteParams } from "../../types/routes";

import styles from "./styles";

const Listings: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, AUTH_ROUTE_NAMES.LISTINGS>>();
  const { get, data, isLoading, isError } = useAPI();

  React.useEffect(() => {
    get(`/images/search/?limit=10&category_ids=${route.params.id}`);
  }, [route]);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      {data?.map((item) => (
        <CatDetails uri={item.url} id={item?.id} key={item.id} />
      ))}
    </ScrollView>
  );
};

export default Listings;
