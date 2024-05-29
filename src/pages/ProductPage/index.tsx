import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Box, Typography, ImageList, ImageListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useProduct from '../../api/hooks/useProduct';
import MainLayout from '../../shared/ui/MainLayout';

const ProductPage = () => {
  const partOfAddress = '/product/'.length;
  const productKey = useLocation().pathname.slice(partOfAddress);
  const { getProduct } = useProduct();
  const [product, setProduct] = useState<ProductProjection | undefined>(undefined);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(productKey);
        setProduct(response.body);
      } catch (error) {
        // TODO solve the problem with ESLINT
        // eslint-disable-next-line no-console
        console.error('Error fetching product:', error);
      }
    };

    // TODO solve the problem with apiRoot
    setTimeout(() => {
      // TODO solve the problem with ESLINT
      // eslint-disable-next-line no-console
      fetchProduct().catch((error) => console.log(error));
    }, 0);
  }, [getProduct, productKey]);

  return (
    <MainLayout>
      <Grid container spacing={0}>
        <Grid xs={12}>
          <Box
            component="div"
            height={150}
            sx={{ bgcolor: 'primary.main', pr: 3, pl: 3 }}
            display="flex"
            alignItems="center"
          >
            <Typography variant="h3" component="h1" fontFamily="Orbitron" color="secondary">
              {product ? product.name.en : 'Something is wrong'}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} container spacing={2} sx={{ mr: 12, ml: 12, mt: 0 }}>
          <Grid xs={8}>
            {product?.masterVariant.images ? (
              <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {product.masterVariant.images.map((image) => (
                  <ImageListItem key={image.url}>
                    <img srcSet={image.url} alt={image.label} loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography component="p" fontFamily="Poppins" color="text.primary">
                Something is wrong
              </Typography>
            )}
          </Grid>
          <Grid xs={4}>
            <Typography component="p" fontFamily="Poppins" color="text.primary">
              Description:
            </Typography>
            <Typography component="p" fontFamily="Poppins" color="text.primary">
              {product ? product.description?.en : 'Something is wrong'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default ProductPage;
