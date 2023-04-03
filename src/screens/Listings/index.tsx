import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View, FlatList } from "react-native";
import CatDetails from "../../components/CatDetails";
import ErrorScreen from "../../components/ErrorScreen";
import FullScreenLoader from "../../components/FullScreenLoader";
import { AUTH_ROUTE_NAMES } from "../../constants/routes";
import useAPI from "../../hooks/useAPI";
import { RouteParams } from "../../types/routes";
import styles from "./styles";

const Listings: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, AUTH_ROUTE_NAMES.LISTINGS>>();
  const { data, isLoading, isError } = useAPI(
    `/images/search/?limit=10&category_ids=${route.params.id}`
  );

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <CatDetails uri={item.url} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Listings;
