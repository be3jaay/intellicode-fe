"use client"
import { Switch, SwitchProps } from "@mantine/core"
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form"

interface ControlledSwitchProps<T extends FieldValues> extends Omit<SwitchProps, "name" | "value" | "onChange"> {
    control: Control<T>
    name: FieldPath<T>
    labelColor?: string
}

export function ControlledSwitch<T extends FieldValues>({
    control,
    name,
    labelColor,
    ...props
}: ControlledSwitchProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Switch
                    {...field}
                    {...props}
                    error={error?.message}
                    styles={{
                        ...props.styles,
                        label: {
                            color: labelColor || "#ffffff",
                            fontWeight: 600,
                        },
                        description: {
                            color: "#b0b0b0",
                        },
                    }}
                />
            )}
        />
    )
}
