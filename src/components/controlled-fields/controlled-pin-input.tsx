import {
  Button,
  Container,
  Flex,
  Loader,
  PinInput,
  PinInputProps,
  Text,
} from "@mantine/core";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export type ControlledPinInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  showResendCode?: boolean;
  showRemainingAttempts?: boolean;
  maxAttempts: number;
  showRemainingTime: boolean;
  remainingTime: number;
} & PinInputProps;

export function ControlledPinInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  showResendCode,
  maxAttempts = 3,
  remainingTime,
  length = 6,
  type,
  inputMode,
  inputType,
  size = "xl",
  disabled,
}: ControlledPinInput<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Container fluid>
          <PinInput
            size={size}
            length={length}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || maxAttempts === 0}
            inputMode={inputMode}
            inputType={inputType}
          />
          {showResendCode ? (
            <Container fluid>
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap={4}
                my={4}
              >
                <Text>Didn't get the otp code?</Text>
                <Button variant="transparent">Resend Code</Button>
              </Flex>
            </Container>
          ) : (
            <Container fluid py={12}>
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap={4}
                my={4}
              >
                <Flex align="center" gap={12}>
                  <Loader size={16} />
                  Remaining Time: {remainingTime}
                </Flex>
                <Button variant="transparent">
                  You have reached your max attempts. Please try again later.
                </Button>
              </Flex>
            </Container>
          )}
        </Container>
      )}
    />
  );
}
