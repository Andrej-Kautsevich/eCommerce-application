import { useState } from 'react';
import { Box, Button, CardMedia, ImageList, ImageListItem } from '@mui/material';
import { ProductProjection, Image } from '@commercetools/platform-sdk';
import responsiveTheme from '../../shared/ui/theme';
import emptyImage from '../../shared/assets/images/empty-img.png';

interface CarouselProps {
  product: ProductProjection;
}

interface MainImageProps {
  image: Image;
}

interface ListOfThumbnailsProps {
  images: Image[];
  image: Image;
  index: number;
  step: number;
  func: (index: number) => void;
}

const MainImage = ({ image }: MainImageProps) => {
  if (!image) return null;
  return (
    <CardMedia
      component="img"
      image={image.url}
      alt={image.label ?? 'Image'}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        target.src = emptyImage;
      }}
      style={{
        width: 'auto',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
        margin: 'auto',
      }}
    />
  );
};

const ListOfThumbnails = ({ images, image, index, step, func }: ListOfThumbnailsProps) => {
  return (
    <ImageListItem
      style={{
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: '5px',
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
          func(index);
        }}
      >
        <MainImage image={images[index]} />
      </Box>
    </ImageListItem>
  );
};

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
                  return (
                    <ListOfThumbnails
                      images={images}
                      image={image}
                      index={index}
                      step={step}
                      func={() => setStep((step + index) % images.length)}
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
                  />
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
            borderRadius: '12px',
            boxShadow: `0px 4px 8px ${responsiveTheme.palette.primary.main}`,
          }}
        >
          <MainImage image={images[step]} />
        </ImageListItem>
      </Box>
    );
  }

  if (images && images.length === 1) {
    return (
      <ImageListItem sx={{ width: 400, height: 400 }}>
        <MainImage image={images[step]} />
      </ImageListItem>
    );
  }

  return (
    <ImageListItem sx={{ width: 400, height: 400 }}>
      <CardMedia component="img" image={emptyImage} alt={emptyImage} />
    </ImageListItem>
  );
};

export default Carousel;
