import { ReactElement } from "react";
import { Controller, UseControllerProps } from "react-hook-form";
import { TextInputProps } from "react-native-paper";
import TextInputComponent from "./textInput";

type FormInputProps = {
  controllerProps: UseControllerProps<
    {
      dp?: any;
      about?: string;
      fullName: string;
      phoneNumber: string;
    },
    any
  >;
  textComponentProps: TextInputProps;
  fieldError?: ReactElement;
};

export default function FormInputComponent({
  controllerProps,
  textComponentProps,
  fieldError: fieldErrors,
}: Readonly<FormInputProps>) {
  return (
    <Controller
      control={controllerProps.control}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInputComponent
            label={textComponentProps.label}
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
          />

          {fieldErrors}
        </>
      )}
      name={controllerProps.name}
    />
  );
}
