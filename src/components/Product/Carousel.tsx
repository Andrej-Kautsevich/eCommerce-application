import { useState } from 'react';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import responsiveTheme from '../../shared/ui/theme';

interface CarouselProps {
  product: ProductProjection;
}

const Carousel = ({ product }: CarouselProps) => {
  const images = product?.masterVariant.images;
  const [step, setStep] = useState(0);

  const getVisibleImages = (imagesList: Image[], currentStep: number, count: number) => {
    const { length } = imagesList;
    return Array.from({ length: count }, (_, index) => imagesList[(currentStep + index) % length]);
  };

  const visibleImages = images ? getVisibleImages(images, step, 5) : [];

  const handlePrev = () => {
    if (images) {
      setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : images.length - 1));
    }
  };

  const handleNext = () => {
    if (images) {
      setStep((prevStep) => (prevStep < images.length - 1 ? prevStep + 1 : 0));
    }
  };

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
          <Button variant="contained" sx={{ height: 30 }} onClick={handlePrev}>
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
            {images && images.length > 5
              ? visibleImages.map((image, index) => {
                  const { label, url } = image;
                  return (
                    <ImageListItem
                      style={{
                        width: 60,
                        height: 60,
                        overflow: 'hidden',
                        border: index === 0 ? `2px solid ${responsiveTheme.palette.primary.main}` : 'none',
                      }}
                      key={label ?? url}
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
                        onClick={() => setStep((step + index) % images.length)}
                      >
                        <img src={url} alt={label ?? 'Image'} loading="lazy" />
                      </Box>
                    </ImageListItem>
                  );
                })
              : images.map((image, index) => (
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
                        setStep(index);
                      }}
                    >
                      <img src={image.url} alt={image.label ?? 'Image'} loading="lazy" />
                    </Box>
                  </ImageListItem>
                ))}
          </ImageList>

          <Button variant="contained" sx={{ height: 30 }} onClick={handleNext}>
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
    const [{ label, url }] = images;
    return (
      <ImageListItem sx={{ width: 400, height: 400 }} key={label ?? url}>
        <img src={url} alt={label ?? 'Image'} loading="lazy" />
      </ImageListItem>
    );
  }

  return <Typography>No images available</Typography>;
};

export default Carousel;
