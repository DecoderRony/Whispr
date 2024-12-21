import { TextInput, TextInputProps } from "react-native-paper";

export default function TextInputComponent({
  label,
  value,
  onChangeText,
  onBlur,
  style,
  ...rest
}: Readonly<TextInputProps>) {
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
