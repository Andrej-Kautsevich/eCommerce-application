import { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import useProduct from '../../api/hooks/useProduct';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { setFilterParams } from '../../shared/store/auth/productsSlice';
import { FilterCategories } from '../../shared/types/enum';

const CatalogSideBar = () => {
  const { getCategories } = useProduct();
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };
    if (!categories.length) {
      // eslint-disable-next-line no-console
      fetchCategories().catch((error) => console.log(error));
    }

    const categoriesFilter = selectedCategories.map((id) => `"${id}"`).join(',');
    if (!categoriesFilter) {
      dispatch(setFilterParams({ [FilterCategories.CATEGORIES]: undefined }));
    } else {
      dispatch(setFilterParams({ [FilterCategories.CATEGORIES]: categoriesFilter }));
    }
  }, [categories, getCategories, dispatch, selectedCategories]);

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>, categoryId: string) => {
    const isChecked = event.target.checked;
    setSelectedCategories((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, categoryId];
      }
      return prevSelected.filter((id) => id !== categoryId);
    });
  };

  return (
    <Toolbar>
      <List sx={{ width: '100%' }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="ul">
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                label={category.name.en}
                control={
                  <Checkbox
                    onChange={(e) => handleCategoryChange(e, category.id)}
                    name={category.id}
                    checked={selectedCategories.includes(category.id)} // Check if category is selected
                  />
                }
              />
            ))}
          </List>
        </Collapse>
      </List>
    </Toolbar>
  );
};

export default CatalogSideBar;
