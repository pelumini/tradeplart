import React, { useMemo } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface IProps {
  acceptZero?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  value: number | string | undefined;
}

type TextFieldWithValidationProps = IProps & TextFieldProps;

export const RepoFormField: React.FC<TextFieldWithValidationProps> = ({
  acceptZero = false,
  name,
  value,
  id,
  label,
  type = 'number',
  required = true,
  onChange,
  size = 'small',
  variant = 'outlined',
  disabled = false,
}) => {
  const isValidInput = useMemo(
    () =>
      acceptZero && value === 0 ? Boolean(value.toString()) : Boolean(value),
    [acceptZero, value]
  );

  return (
    <TextField
      error={!isValidInput}
      name={name}
      id={id}
      label={label}
      value={value}
      type={type}
      variant={variant}
      fullWidth
      size={size}
      required={required}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
