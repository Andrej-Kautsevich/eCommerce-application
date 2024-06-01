import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SortNames } from '../../shared/types/enum';

const CatalogSortPanel = () => {
  const sortNames = [SortNames.PRICE_ASC, SortNames.PRICE_DESC];

  const [sortParam, setSortParam] = useState('');

  const handleSortParamChange = (event: SelectChangeEvent) => {
    setSortParam(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select labelId="sort-label" value={sortParam} label="Sort" onChange={handleSortParamChange}>
        {sortNames.map((sortName, index) => (
          <MenuItem value={index} key={sortName}>
            {sortName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CatalogSortPanel;
