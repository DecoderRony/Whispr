import { PropsWithChildren } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

type TextProps = {
  variant: VariantProp<never>;
  styles?: StyleProp<TextStyle>;
};

export default function TextComponent({
  variant,
  styles,
  children,
}: Readonly<PropsWithChildren<TextProps>>) {
  return (
    <Text variant={variant} style={styles}>
      {children}
    </Text>
  );
}
