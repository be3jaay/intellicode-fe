"use client"
import { TagsInput, TagsInputProps } from "@mantine/core"
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form"

interface ControlledPillsInputProps<T extends FieldValues> extends Omit<TagsInputProps, "name" | "value" | "onChange"> {
    control: Control<T>
    name: FieldPath<T>
    labelColor?: string
    borderColor?: string
}

export function ControlledPillsInput<T extends FieldValues>({
    control,
    name,
    labelColor,
    borderColor,
    ...props
}: ControlledPillsInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TagsInput
                    {...props}
                    value={field.value || []}
                    onChange={field.onChange}
                    error={error?.message}
                    placeholder="Type and press Enter to add tags"
                    styles={{
                        ...props.styles,
                        label: {
                            color: labelColor || "#ffffff",
                            fontWeight: 600,
                            marginBottom: "8px",
                        },
                        input: {
                            background: "#1a1a1a",
                            border: `1px solid ${borderColor || "#4fd1c5"}`,
                            color: "#ffffff",
                            "&:focus": {
                                borderColor: borderColor || "#38b2ac",
                            },
                            "&:hover": {
                                borderColor: borderColor || "#38b2ac",
                            },
                        },
                        pill: {
                            background: "rgba(79, 209, 197, 0.2)",
                            color: "#4fd1c5",
                            border: "1px solid #4fd1c5",
                            "&:hover": {
                                background: "rgba(79, 209, 197, 0.3)",
                            },
                        },

                    }}
                />
            )}
        />
    )
}
