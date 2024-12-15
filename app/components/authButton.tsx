import { PropsWithChildren } from "react";
import { ViewStyle, StyleSheet, StyleProp } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type AuthButtonProps = ButtonProps;

const defaultStyles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 12,
  },
});

export default function ButtonComponent({
  icon,
  buttonColor,
  onPress,
  style,
  children,
  ...rest
}: Readonly<PropsWithChildren<AuthButtonProps>>) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      icon={icon}
      buttonColor={buttonColor}
      style={[defaultStyles.buttonStyle, style]}
      {...rest}
    >
      {children}
    </Button>
  );
}
