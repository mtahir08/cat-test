import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import NavigationStack from "./src/stacks";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NavigationStack />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}
