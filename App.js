import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";
import NavigationStack from "./src/stacks";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationStack />
          <Toast />
        </FavoritesProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
