/* eslint-disable react/jsx-props-no-spreading */
import { Unstable_NumberInput as BaseNumberInput, NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { ForwardedRef, forwardRef } from 'react';
import { Box, IconButton, TextField, styled } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const InputRoot = styled(Box)(() => ({ display: 'flex', flexFlow: 'row' }));

const InputBase = styled((props) => <TextField {...props} size="small" />)(({ theme }) => ({
  maxWidth: theme.spacing(8),
  textAlign: 'center',
  order: 2,
}));

interface ButtonProps {
  onClick: () => void;
}

const IncrementButton = styled(({ onClick, disabled, ...props }: ButtonProps & { disabled?: boolean }) => (
  <IconButton {...props} onClick={onClick} disabled={disabled}>
    <Add fontSize="small" />
  </IconButton>
))({
  order: 3,
});

const DecrementButton = styled(({ onClick, disabled, ...props }: ButtonProps & { disabled?: boolean }) => (
  <IconButton {...props} onClick={onClick} disabled={disabled}>
    <Remove fontSize="small" />
  </IconButton>
))({
  order: 1,
});

const NumberInput = forwardRef(function CustomNumberInput(props: NumberInputProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <BaseNumberInput
      slots={{
        root: InputRoot,
        input: InputBase,
        incrementButton: IncrementButton,
        decrementButton: DecrementButton,
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
