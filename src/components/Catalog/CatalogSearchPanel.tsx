import { ChangeEvent } from 'react';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../shared/store/hooks';
import { setSearchParam } from '../../shared/store/auth/productsSlice';

const CatalogSearchPanel = () => {
  const dispatch = useAppDispatch();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length > 3) dispatch(setSearchParam(input));
    if (!input) dispatch(setSearchParam(undefined));
  };

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <OutlinedInput margin="dense" fullWidth onChange={handleInput} endAdornment={<InputAdornment position="end" />} />
      <IconButton disabled sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
    </FormControl>
  );
};

export default CatalogSearchPanel;
