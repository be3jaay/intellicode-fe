'use client';

import { PasswordInput } from '@mantine/core';
import { FieldValues, FieldPath, Controller } from 'react-hook-form';
import { ControlledTextInputProps, HelperText } from './controlled-text-input';

function ControlledPasswordInput<
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
  ...props
}: ControlledTextInputProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <>
          <PasswordInput
            id={name}
            ref={ref}
            label={label}
            required={isRequired}
            leftSection={leftSection}
            rightSection={rightSection}
            placeholder={placeholder}
            type={type}
            onChange={e => onChange(e.target.value)}
            value={value || ''}
            onBlur={onBlur}
            error={error?.message}
            suppressHydrationWarning={true}
            {...props}
          />
          {helperText && <HelperText>{helperText}</HelperText>}
        </>
      )}
    />
  );
}

export { ControlledPasswordInput };
