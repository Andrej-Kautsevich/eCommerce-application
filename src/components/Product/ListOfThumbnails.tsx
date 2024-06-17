import { Box, ImageListItem } from '@mui/material';
import { Image } from '@commercetools/platform-sdk';
import MainImage from './MainImage';

interface ListOfThumbnailsProps {
  images: Image[];
  image: Image;
  index: number;
  step: number;
  func: (index: number) => void;
}

const ListOfThumbnails = ({ images, image, index, step, func }: ListOfThumbnailsProps) => {
  return (
    <ImageListItem
      sx={(theme) => ({
        width: 60,
        height: 60,
        overflow: 'hidden',
        borderRadius: '5px',
        border: index === step ? `2px solid ${theme.palette.primary.main}` : 'none',
      })}
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

export default ListOfThumbnails;
