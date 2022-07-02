/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

type Props<T> = {
  filterKey: keyof T;
  data: T[] | undefined;
  onSelected: (eent: React.SyntheticEvent, value: T | null) => void;
  label: string;
};
export const DropDownList = <T,>({
  data,
  onSelected,
  filterKey,
  label,
}: Props<T>) => {
  return (
    <Autocomplete
      id={filterKey as string}
      sx={{ minWidth: '50%' }}
      options={data || []}
      getOptionLabel={(option) => option[filterKey] as unknown as string}
      onChange={onSelected}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          label={label}
          margin="normal"
        />
      )}
    ></Autocomplete>
  );
};
