import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labelsContainer: {
    width: 200,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "space-around",
  },
  img: {
    width: 200,
    height: 200,
  },
  label: {
    marginTop: 3,
    backgroundColor: "#EFE9AE",
    marginRight: 5,
    padding: 5,
    borderRadius: 3,
  },
});

export default styles;
