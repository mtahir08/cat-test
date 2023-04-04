import { Share } from "react-native";
import Toast from "react-native-toast-message";

export const shareURL = async (uri: string) => {
  try {
    await Share.share({
      message: `Hey! Give this a look: ${uri}`,
    });
  } catch (e) {
    Toast.show({
      type: "error",
      text1: "Ops! Some error occurred.",
    });
  }
};
