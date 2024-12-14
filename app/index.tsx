import {
  Keyboard,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginView from "./screens/loginScreen";

export default function Index() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{flexGrow: 1}}>
          <LoginView />
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}
