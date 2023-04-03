import { NavigationContainer } from "@react-navigation/native";
import UnAuthStack from "./src/stacks/unAuthStack";

export default function App() {
  return (
    <NavigationContainer>
      <UnAuthStack />
    </NavigationContainer>
  );
}
