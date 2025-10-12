'use client';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import React from 'react';
import { Checkbox, CheckboxProps } from '@mantine/core';

export type ControlledCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  isRequired?: boolean;
  icon?: React.FC<{
    indeterminate: boolean | undefined;
    className: string;
  }>;
} & CheckboxProps;

function ControlledCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  isRequired,
  icon,
  error,
  labelPosition,
  label,
  size,
  color,
  ...props
}: ControlledCheckboxProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <React.Fragment>
          <Checkbox
            ref={ref}
            value={value}
            checked={value || false}
            onChange={e => onChange(e.target.checked)}
            onBlur={onBlur}
            required={isRequired}
            icon={icon}
            error={error}
            label={label}
            labelPosition={labelPosition || 'right'}
            color={color || 'red.6'}
            size={size || 'md'}
            suppressHydrationWarning={true}
            {...props}
          />
        </React.Fragment>
      )}
    />
  );
}

export { ControlledCheckbox };
