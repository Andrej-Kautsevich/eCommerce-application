import { Box, CardMedia } from '@mui/material';
import { Image } from '@commercetools/platform-sdk';
import emptyImage from '../../shared/assets/images/empty-img.png';

interface MainImageProps {
  image: Image;
}

const MainImage = ({ image }: MainImageProps) => {
  if (!image) return null;
  return (
    <Box sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    </Box>
  );
};

export default MainImage;
