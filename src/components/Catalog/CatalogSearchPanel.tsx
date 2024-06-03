// import { ChangeEvent, useState } from 'react';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import { useAppDispatch } from '../../shared/store/hooks';
// import { setFilterParams } from '../../shared/store/auth/productsSlice';
// import { FilterCategories } from '../../shared/types/enum';

const CatalogSearchPanel = () => {
  // const dispatch = useAppDispatch();

  // const [searchInput, setSearchInput] = useState('');

  // const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   // const input = event.target.value;
  //   // setSearchInput(input);
  //   // dispatch(setFilterParams({ [FilterCategories.SEARCH]: searchInput }));
  // };

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <OutlinedInput
        margin="dense"
        fullWidth
        // onChange={handleInput}
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CatalogSearchPanel;
