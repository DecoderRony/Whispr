import { StyleSheet } from "react-native";
import TextComponent from "./text";
import { TextInputProps } from "react-native-paper";

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -5,
    fontWeight: "500",
  },
});

type ErrorComponentProps = {
  errorMessage?: string;
} & TextInputProps;

export default function ErrorComponent({
  errorMessage,
  style,
  ...rest
}: Readonly<ErrorComponentProps>) {
  return (
    <TextComponent
      variant="displaySmall"
      styles={[styles.errorText, style]}
      {...rest}
    >
      {errorMessage}
    </TextComponent>
  );
}
