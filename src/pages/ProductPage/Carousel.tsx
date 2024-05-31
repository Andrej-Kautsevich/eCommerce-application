import { useState } from 'react';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import { ProductProjection } from '@commercetools/platform-sdk';
import responsiveTheme from '../../shared/ui/theme';

interface CarouselProps {
  product: ProductProjection;
}

const Carousel = ({ product }: CarouselProps) => {
  const images = product?.masterVariant.images;
  const [step, getStep] = useState(0);

  if (images && images.length > 1) {
    return (
      <Box
        sx={{
          width: 470,
          height: 470,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: 100, height: 470, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{ height: 30 }}
            onClick={() => {
              if (step > 0) {
                getStep(step - 1);
              } else {
                getStep(images.length - 1);
              }
            }}
          >
            ↑
          </Button>

          <ImageList
            sx={{
              width: 100,
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            variant="quilted"
          >
            {images
              .filter((_, index) => index < 5)
              .map((image, index) => (
                <ImageListItem
                  style={{
                    width: 60,
                    height: 60,
                    overflow: 'hidden',
                    border: index === step ? `2px solid ${responsiveTheme.palette.primary.main}` : 'none',
                  }}
                  key={image.label ?? image.url}
                >
                  <Box
                    component="div"
                    sx={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      getStep(index);
                    }}
                  >
                    <img src={image.url} alt={image.label ?? 'Image'} loading="lazy" />
                  </Box>
                </ImageListItem>
              ))}
          </ImageList>

          <Button
            variant="contained"
            sx={{ height: 30 }}
            onClick={() => {
              if (step < images.length - 1) {
                getStep(step + 1);
              } else {
                getStep(0);
              }
            }}
          >
            ↓
          </Button>
        </Box>
        <ImageListItem
          style={{
            width: 470,
            height: 470,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={images[step].label ?? images[step].url}
        >
          <img
            src={images[step].url}
            alt={images[step].label ?? 'Image'}
            loading="lazy"
            style={{ width: 'auto', height: 'auto', objectFit: 'cover', display: 'block', margin: 'auto' }}
          />
        </ImageListItem>
      </Box>
    );
  }

  if (images && images.length === 1) {
    return (
      <ImageListItem sx={{ width: 400, height: 400 }} key={images[0].label ?? images[0].url}>
        <img src={images[0].url} alt={images[0].label ?? 'Image'} loading="lazy" />
      </ImageListItem>
    );
  }

  return <Typography>No images available</Typography>;
};

export default Carousel;
