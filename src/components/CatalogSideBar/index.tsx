import { useEffect, useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import useProduct from '../../api/hooks/useProduct';
import { useAppSelector } from '../../shared/store/hooks';

const CatalogSideBar = () => {
  const { getCategories } = useProduct();

  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    };
    if (!categories.length) {
      // eslint-disable-next-line no-console
      fetchCategories().catch((error) => console.log(error));
    }
  }, [categories, getCategories]);

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
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
              <FormControlLabel key={category.id} label={category.name.en} control={<Checkbox />} />
            ))}
          </List>
        </Collapse>
      </List>
    </Toolbar>
  );
};

export default CatalogSideBar;
