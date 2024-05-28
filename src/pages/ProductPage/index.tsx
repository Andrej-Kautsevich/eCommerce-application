import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Header from '../../components/Header';
import useProduct from '../../api/hooks/useProduct';

const ProductPage = () => {
  const productKey = useLocation().pathname.slice(1);
  const { getProduct } = useProduct();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(productKey);

        setProduct(response.body);
        console.log(response);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    /* eslint-disable */
    fetchProduct();
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid xs={12}>
        <Header />
      </Grid>
      <Grid xs={12}>
        <Box
          component="div"
          height={150}
          sx={{ bgcolor: 'primary.main', pr: 12, pl: 12 }}
          display="flex"
          alignItems="center"
        >
          <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
            {product ? product.name.en : 'no data'}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} container spacing={2} sx={{ bgcolor: 'gray', mr: 12, ml: 12, mt: 0 }}>
        <Grid xs={8} sx={{ bgcolor: 'gray' }}>
          photo
        </Grid>
        <Grid xs={4} sx={{ bgcolor: 'pink' }}>
          info
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
