import { ChangeEvent, useState } from 'react';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../shared/store/hooks';
import { setSearchParam } from '../../shared/store/auth/productsSlice';

const CatalogSearchPanel = () => {
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);
    if (input.length > 3) dispatch(setSearchParam(input));
    if (!input) dispatch(setSearchParam(undefined));
  };

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <OutlinedInput
        margin="dense"
        fullWidth
        onChange={handleInput}
        value={searchInput}
        endAdornment={<InputAdornment position="end" />}
      />
      <IconButton sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
    </FormControl>
  );
};

export default CatalogSearchPanel;
