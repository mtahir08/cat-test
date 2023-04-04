import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import NavigationStack from "./src/stacks";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <NavigationStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
