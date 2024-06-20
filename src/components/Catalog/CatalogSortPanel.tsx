import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SortNames } from '../../shared/types/enum';
import { useAppDispatch } from '../../shared/store/hooks';
import { setSortParam } from '../../shared/store/auth/productsSlice';

const CatalogSortPanel = () => {
  const sortNames = [SortNames.PRICE_ASC, SortNames.PRICE_DESC, SortNames.NAME];
  const dispatch = useAppDispatch();

  const [sortParamInput, setSortParamInput] = useState('');

  const handleSortParamChange = (event: SelectChangeEvent) => {
    const selectedSortParam = event.target.value as SortNames;
    setSortParamInput(selectedSortParam);

    switch (selectedSortParam) {
      case SortNames.PRICE_ASC:
        dispatch(setSortParam('price asc'));
        break;
      case SortNames.PRICE_DESC:
        dispatch(setSortParam('price desc'));
        break;
      case SortNames.NAME:
        dispatch(setSortParam('name.en asc'));
        break;
      default:
    }
  };

  return (
    <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select labelId="sort-label" value={sortParamInput} label="Sort" onChange={handleSortParamChange}>
        {sortNames.map((sortName) => (
          <MenuItem value={sortName} key={sortName}>
            {sortName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CatalogSortPanel;
