import { Box, CardMedia } from '@mui/material';
import emptyImage from '../../shared/assets/images/empty-img.png';

const Photo = ({ image }: { image: string }) => {
  if (!image) return null;
  return (
    <Box sx={{ width: 200, height: 200 }}>
      <CardMedia
        component="img"
        image={image}
        alt={image ?? 'Image'}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = emptyImage;
        }}
        style={{
          width: '80%',
          height: '80%',
          objectFit: 'cover',
          display: 'block',
          margin: 'auto',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
};
export default Photo;
