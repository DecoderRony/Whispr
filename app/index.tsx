import { Keyboard } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import "./imports/gestureHandler";
import MainStackNavigator from "./navigation/mainStack";

export default function Index() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <PaperProvider theme={DefaultTheme}>
        <MainStackNavigator />
    </PaperProvider>
  );
}
