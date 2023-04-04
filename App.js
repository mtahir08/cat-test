import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import UnAuthStack from "./src/stacks/unAuthStack";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <UnAuthStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
