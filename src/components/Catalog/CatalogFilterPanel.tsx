import { AttributeDefinition } from '@commercetools/platform-sdk';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Checkbox, Collapse, FormControlLabel, List, ListItemButton, ListItemText } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setFilterParams } from '../../shared/store/auth/productsSlice';

interface CatalogFilterPanelProps {
  attribute: AttributeDefinition;
}

const CatalogFilterPanel = ({ attribute }: CatalogFilterPanelProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const { filterParams } = useAppSelector((state) => state.products);

  // Reset selectedAttributes when filterParams is reset
  useEffect(() => {
    if (filterParams.every((filterParam) => filterParam[`variants.attributes.${attribute.name}.key`] === undefined)) {
      setSelectedAttributes([]);
    }
  }, [filterParams, attribute.name]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    const isChecked = event.target.checked;
    setSelectedAttributes((prevSelected) => {
      let newSelected;
      if (isChecked) {
        newSelected = [...prevSelected, value];
      } else {
        newSelected = prevSelected.filter((key) => key !== value);
      }
      const categoriesFilter = newSelected.map((key) => `"${key}"`).join(',');
      if (!categoriesFilter) {
        dispatch(setFilterParams({ [`variants.attributes.${attribute.name}.key`]: undefined }));
      } else {
        dispatch(setFilterParams({ [`variants.attributes.${attribute.name}.key`]: categoriesFilter }));
      }
      return newSelected;
    });
  };

  return (
    <Box>
      {/* TODO Add boolean support */}
      {/*       {attribute.type.name === 'boolean' && (
        <FormControlLabel key={attribute.name} label={attribute.label.en} control={<Checkbox />} />
      )} */}
      {attribute.type.name === 'enum' && (
        <Box>
          <ListItemButton onClick={handleClick}>
            <ListItemText sx={{ color: 'text.primary' }} primary={attribute.label.en} />
            {open ? (
              <ExpandLess sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
            ) : (
              <ExpandMore sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
            )}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="ul" sx={{ color: 'text.primary' }}>
              {attribute.type.values.map((value) => (
                <FormControlLabel
                  key={value.key}
                  label={value.label}
                  sx={{ color: 'text.primary' }}
                  control={
                    <Checkbox
                      onChange={(e) => handleChange(e, value.key)}
                      name={value.label}
                      checked={selectedAttributes.includes(value.key)}
                    />
                  }
                />
              ))}
            </List>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};

export default CatalogFilterPanel;
