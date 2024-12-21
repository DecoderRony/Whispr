import { PermissionsAndroid, PermissionStatus, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import TextComponent from "../components/text";
import { NavigationsProps } from "../types/types";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default function InboxScreen({
  navigation,
}: Readonly<NavigationsProps<"Inbox">>) {
  const handleOnFABPress = async () => {
    const permission: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );

    if (permission === "granted") {
      console.log("granted");
      navigation.navigate("Contacts");
    } else {
      console.log("denied");
    }
  };

  return (
    <>
      <TextComponent variant="bodyMedium">inbox</TextComponent>
      <FAB
        icon="plus"
        variant="secondary"
        style={styles.fab}
        onPress={async () => handleOnFABPress()}
      />
    </>
  );
}
