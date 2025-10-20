"use client";
import { StylesApiProps, Text, TextInput, rem } from "@mantine/core";
import React, { HTMLInputTypeAttribute } from "react";
import { FieldValues, FieldPath, Control, Controller } from "react-hook-form";

export type ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  isRequired?: boolean;
  helperText?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  labelColor?: string;
  borderColor?: string;
};

function ControlledTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  isRequired,
  helperText,
  leftSection,
  rightSection,
  placeholder,
  type,
  disabled,
  labelColor = "#bdf052",
  borderColor = "#bdf052",
  ...props
}: ControlledTextInputProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <React.Fragment>
          <TextInput
            ref={ref}
            label={label}
            required={isRequired}
            leftSection={leftSection}
            rightSection={rightSection}
            placeholder={placeholder}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            value={value || ""}
            error={error?.message}
            suppressHydrationWarning={true}
            disabled={disabled}
            styles={{
              label: {
                color: labelColor,
                fontWeight: 600,
                marginBottom: 8,
              },
              input: {
                background: "#1a1a1a",
                borderColor: borderColor,
                color: "#ffffff",
                fontSize: rem(15),
                "&:focus": {
                  borderColor: labelColor,
                },
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.4)",
                },
              },
            }}
            {...props}
          />
          {helperText && <HelperText>{helperText}</HelperText>}
        </React.Fragment>
      )}
    />
  );
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <Text>{children}</Text>;
}

export { HelperText, ControlledTextInput };
