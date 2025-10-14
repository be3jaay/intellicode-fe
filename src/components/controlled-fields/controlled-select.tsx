import { ComboboxData, Select, rem } from "@mantine/core";
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
        labelColor?: string;
        borderColor?: string;
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
        labelColor = "#bdf052",
        borderColor = "#bdf052",
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
                            dropdown: {
                                background: "#1a1a1a",
                                borderColor: borderColor,
                            },
                            option: {
                                color: "#ffffff",
                                "&:hover": {
                                    background: `${borderColor.replace('0.3', '0.1')}`,
                                },
                                "&[data-selected]": {
                                    background: `${borderColor.replace('0.3', '0.2')}`,
                                    color: labelColor,
                                },
                            },
                        }}
                        {...props}
                    />
                </React.Fragment>
            )}
        />
    );
}
