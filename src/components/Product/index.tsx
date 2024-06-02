import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useProduct from '../../api/hooks/useProduct';
import Carousel from './Carousel';
import MainLayout from '../../shared/ui/MainLayout';
import PageTitle from '../PageTitle';

const Product = () => {
  const productID = useLocation().pathname.split('/').slice(2).join(); // delete /product/ path
  const { getProduct } = useProduct();
  const [product, setProduct] = useState<ProductProjection | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(productID);
        setProduct(response.body);
        if (response.body.masterVariant.prices![0].value.centAmount) {
          setPrice(response.body.masterVariant.prices![0].value.centAmount);
        }
        if (response.body.masterVariant.prices![0].discounted?.value.centAmount) {
          setDiscount(response.body.masterVariant.prices![0].discounted?.value.centAmount);
        }
      } catch (error) {
        // TODO solve the problem with ESLINT
        // eslint-disable-next-line no-console
        console.error('Error fetching product:', error);
      }
    };

    // TODO solve the problem with ESLINT
    // eslint-disable-next-line no-console
    fetchProduct().catch((error) => console.log(error));
  }, [getProduct, productID]);

  return (
    <MainLayout>
      <Grid container spacing={0}>
        <PageTitle title={product ? product.name.en : 'Something is wrong'}>
          <Breadcrumbs />
        </PageTitle>

        <Grid container xs={12} spacing={2} sx={{ mr: 12, ml: 12, mt: 0 }}>
          <Grid xs={8}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Carousel product={product!} />
            </div>
          </Grid>
          <Grid xs={4}>
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              Description:
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.primary" sx={{ mb: 3 }}>
              {product ? product.description?.en : 'Something is wrong'}
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.secondary">
              Price:
            </Typography>
            <Typography
              component="p"
              fontFamily="Poppins"
              color="text.primary"
              sx={{
                mb: 3,
                textDecoration: discount > 0 ? 'line-through' : 'none',
              }}
            >
              {product ? `$${(price / 100).toFixed(2)}` : 'Something is wrong'}
            </Typography>
            {discount > 0 && (
              <Box>
                <Typography component="p" fontFamily="Poppins" color="text.secondary">
                  SALE PRICE:
                </Typography>
                <Typography component="p" fontFamily="Poppins" color="red" sx={{ mb: 3, fontSize: 36 }}>
                  {product ? `$${(discount / 100).toFixed(2)}` : 'Something is wrong'}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Product;
