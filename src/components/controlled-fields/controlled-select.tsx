import { ComboboxData, Select } from "@mantine/core";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

export type ControlledSelectInputProps<TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
        name: TFieldName;
        control: Control<TFieldValues>;
        label?: string;
        isRequired?: boolean;
        leftSection?: React.ReactNode;
        rightSection?: React.ReactNode;
        placeholder?: string;
        options: ComboboxData;
        [key: string]: any;
    }

export function ControlledSelectInput<TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
        name,
        control,
        label,
        isRequired,
        leftSection,
        rightSection,
        placeholder,
        options,
        ...props
    }: ControlledSelectInputProps<TFieldValues, TFieldName>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref, }, fieldState: { error } }) => (
                <React.Fragment>
                    <Select
                        ref={ref}
                        label={label}
                        required={isRequired}
                        leftSection={leftSection}
                        rightSection={rightSection}
                        placeholder={placeholder}
                        data={options}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value || ""}
                        error={error?.message}
                        suppressHydrationWarning={true}
                        {...props}
                    />
                </React.Fragment>
            )}
        />
    );
}
