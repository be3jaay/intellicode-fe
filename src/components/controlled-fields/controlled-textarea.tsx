"use client";
import { Text, Textarea } from "@mantine/core";
import React from "react";
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
};

function ControlledTextArea<
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
                    <Textarea
                        w="100%"
                        autosize
                        minRows={5}
                        ref={ref}
                        label={label}
                        required={isRequired}
                        leftSection={leftSection}
                        rightSection={rightSection}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                        value={value || ""}
                        error={error?.message}
                        suppressHydrationWarning={true}
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

export { HelperText, ControlledTextArea };
