import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import useAPI from "../../hooks/useAPI";

import CatCard from "../../components/CatCard";
import ErrorScreen from "../../components/ErrorScreen";
import FullScreenLoader from "../../components/FullScreenLoader";

import { ROUTE_NAMES } from "../../constants/routes";

import { RouteParams } from "../../types/routes";

import styles from "./styles";

const Listings: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, ROUTE_NAMES.LISTINGS>>();
  const { get, data, isLoading, isError, headers } = useAPI();
  const [paginationCount, setPaginationCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [dataToShow, setDataToShow] = React.useState([]);

  React.useEffect(() => {
    if (!isLoading)
      get(
        `/images/search/?limit=10&category_ids=${route.params.id}&order=ASC&page=${currentPage}`
      );
  }, [route.params.id, currentPage]);

  React.useEffect(() => {
    setPaginationCount(headers?.map["pagination-count"]);
  }, [headers]);

  React.useEffect(() => {
    if (data?.length) {
      setDataToShow([...dataToShow, ...data]);
    }
  }, [JSON.stringify(data)]);

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

  const onEndReached = () => {
    if (currentPage < paginationCount) setCurrentPage(currentPage + 1);
  };

  const numColumns = 2;

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
