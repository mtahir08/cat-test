import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 15,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
