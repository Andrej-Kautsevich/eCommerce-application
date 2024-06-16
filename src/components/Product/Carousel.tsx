import { useState } from 'react';
import { Box, Button, CardMedia, ImageList, ImageListItem } from '@mui/material';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import responsiveTheme from '../../shared/ui/theme';
import emptyImage from '../../shared/assets/images/empty-img.png';
import MainImage from './MainImage';
import ListOfThumbnails from './ListOfThumbnails';
import ModalWindow from './ModalWindow';

interface CarouselProps {
  product: ProductProjection;
}

const Carousel = ({ product }: CarouselProps) => {
  const images = product?.masterVariant.images;
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (images && images.length > 1) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <ModalWindow
          images={images}
          step={step}
          isOpen={open}
          handleClose={handleClose}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button variant="contained" sx={{ height: 30 }} onClick={handlePrev}>
            ↑
          </Button>

          <ImageList
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            variant="quilted"
          >
            {images && images.length > 5
              ? visibleImages.map((image, index) => {
                  return (
                    <ListOfThumbnails
                      images={images}
                      image={image}
                      index={index}
                      step={step}
                      func={() => setStep((step + index) % images.length)}
                      key={image.label ?? image.url}
                    />
                  );
                })
              : images.map((image, index) => (
                  <ListOfThumbnails
                    images={images}
                    image={image}
                    index={index}
                    step={step}
                    func={() => setStep(index)}
                    key={image.label ?? image.url}
                  />
                ))}
          </ImageList>

          <Button variant="contained" sx={{ height: 30 }} onClick={handleNext}>
            ↓
          </Button>
        </Box>
        <ImageListItem
          component="div"
          sx={{
            width: {
              xs: '70vw',
              sm: '70vw',
              md: '40vw',
              lg: '40vw',
            },
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            boxShadow: `0px 4px 8px ${responsiveTheme.palette.primary.main}`,
          }}
          onClick={handleOpen}
        >
          <MainImage image={images[step]} />
        </ImageListItem>
      </Box>
    );
  }

  if (images && images.length === 1) {
    return (
      <div>
        <ModalWindow
          images={images}
          step={step}
          isOpen={open}
          handleClose={handleClose}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <ImageListItem
          component="div"
          style={{
            width: 470,
            height: 470,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            boxShadow: `0px 4px 8px ${responsiveTheme.palette.primary.main}`,
          }}
          onClick={handleOpen}
        >
          <MainImage image={images[step]} />
        </ImageListItem>
      </div>
    );
  }

  return (
    <ImageListItem sx={{ width: 400, height: 400 }}>
      <CardMedia component="img" image={emptyImage} alt={emptyImage} />
    </ImageListItem>
  );
};

export default Carousel;
