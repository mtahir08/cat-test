import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import CategoryItem from "../../components/CategoryItem";
import { Category } from "../../types";
import FullScreenLoader from "../../components/FullScreenLoader";
import styles from "./styles";
import useAPI from "../../hooks/useAPI";
import ErrorScreen from "../../components/ErrorScreen";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useAPI("/categories");

  if (isLoading) return <FullScreenLoader />;

  if (isError) return <ErrorScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }: { item: Category }) => (
          <CategoryItem title={item.name} id={item.id} />
        )}
        keyExtractor={(item) => `${item.name}-${item.id}`}
        style={{
          paddingHorizontal: 15,
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
