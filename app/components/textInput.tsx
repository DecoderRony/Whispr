import { Noop } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type TextInputComponentProps = TextInputProps;

export default function TextInputComponent({
  label,
  value,
  onChangeText,
  onBlur,
  style,
  ...rest
}: Readonly<TextInputComponentProps>) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={[{ width: "100%" }, style]}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      outlineStyle={{ borderRadius: 12 }}
      {...rest}
    />
  );
}
