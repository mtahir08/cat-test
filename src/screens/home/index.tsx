import React from "react";
import { FlatList, SafeAreaView } from "react-native";

import { Category } from "../../types";

import ErrorScreen from "../../components/ErrorScreen";
import CategoryItem from "../../components/CategoryItem";
import FullScreenLoader from "../../components/FullScreenLoader";

import useAPI from "../../hooks/useAPI";

import styles from "./styles";

const Home: React.FC = () => {
  const { get, data, isLoading, isError } = useAPI();

  React.useEffect(() => {
    get("/categories");
  }, []);

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data ?? []}
        style={styles.listPadding}
        renderItem={({ item }: { item: Category }) => (
          <CategoryItem title={item.name} id={item.id} />
        )}
        keyExtractor={(item) => `${item.name}-${item.id}`}
      />
    </SafeAreaView>
  );
};

export default Home;
