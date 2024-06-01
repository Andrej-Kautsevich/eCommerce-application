import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import useProduct from '../../api/hooks/useProduct';
import { useAppSelector } from '../../shared/store/hooks';

const CatalogSideBar = () => {
  const { getCategories, getFilteredProducts } = useProduct();

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

  const id = '7fae432e-2181-4cba-949b-23cef3ae6efb';
  const id2 = 'e2df471f-11f3-4c23-834f-f60d2c4ff092';

  const handleBtnClick = async () => {
    await getFilteredProducts(id, id2);
  };

  return (
    <Toolbar>
      <Button onClick={handleBtnClick}>Get by category</Button>
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
