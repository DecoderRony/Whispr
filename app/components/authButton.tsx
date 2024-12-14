import { PropsWithChildren } from "react";
import { ViewStyle, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type AuthButtonProps = {
  icon?: IconSource;
  buttonColor?: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 12,
  },
});

export default function AuthButton({
  icon,
  buttonColor,
  onPress,
  children,
}: Readonly<PropsWithChildren<AuthButtonProps>>) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      icon={icon}
      buttonColor={buttonColor}
      style={styles.buttonStyle}
    >
      {children}
    </Button>
  );
}
