"use client"
import { NumberInput, rem } from "@mantine/core"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface ControlledNumberInputProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    isRequired?: boolean
    labelColor?: string
    borderColor?: string
    leftSection?: React.ReactNode
    min?: number
    max?: number
}

export function ControlledNumberInput<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    isRequired = false,
    labelColor = "#e9eeea",
    borderColor = "#484c4f",
    leftSection,
    min,
    max,
}: ControlledNumberInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: isRequired }}
            render={({ field }) => (
                <NumberInput
                    {...field}
                    value={field.value as number}
                    onChange={(value) => field.onChange(value)}
                    label={label}
                    placeholder={placeholder}
                    required={isRequired}
                    size="md"
                    leftSection={leftSection}
                    min={min}
                    max={max}
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
                                borderColor: borderColor,
                            },
                        },
                    }}
                />
            )}
        />
    )
}

