import React from "react";
import { View, Image } from "react-native";
import Button from "../Button";
import styles from "./styles";

type Props = {
  uri: string;
};

const CatDetails: React.FC<Props> = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Button
        title="Mark as favourite"
        onPress={() => {}}
        containerStyles={styles.btn}
      />
      <Button
        title="Share"
        onPress={() => {}}
        type="secondary"
        containerStyles={styles.btn}
      />
    </View>
  );
};

export default CatDetails;
