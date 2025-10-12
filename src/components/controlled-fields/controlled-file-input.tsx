"use client";
import { Text, FileInput } from "@mantine/core";
import React from "react";
import { FieldValues, FieldPath, Control, Controller } from "react-hook-form";

export type ControlledFileInputProps<
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
    accept?: string;
    style?: React.CSSProperties;
};

function ControlledFileInput<
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
    accept,
    style,
    ...props
}: ControlledFileInputProps<TFieldValues, TName>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
            }) => (
                <React.Fragment>
                    <FileInput
                        label={label}
                        required={isRequired}
                        leftSection={leftSection}
                        rightSection={rightSection}
                        placeholder={placeholder}
                        accept={accept}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || null}
                        error={error?.message}
                        style={style}
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

export { HelperText, ControlledFileInput }; 