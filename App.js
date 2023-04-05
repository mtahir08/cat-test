import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import NavigationStack from "./src/stacks";
import AuthProvider from "./src/context/AuthContext";
import FavoritesProvider from "./src/context/FavoritesContext";

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
