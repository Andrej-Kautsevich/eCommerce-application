import { Box, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from '@commercetools/platform-sdk';
import MainImage from './MainImage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '98vw',
    sm: '85vw',
    md: '70vw',
    lg: '55vw',
  },
  height: '90vh',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
};

interface ModalWindowProps {
  images: Image[];
  step: number;
  isOpen: boolean;
  handleClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const ModalWindow = ({ images, step, isOpen, handleClose, handlePrev, handleNext }: ModalWindowProps) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{
            width: {
              xs: '25px',
              sm: '40px',
              md: '60px',
            },
            height: '80%',
            position: 'absolute',
            left: 0,
            display: images.length > 1 ? 'flex' : 'none',
            ml: '5px',
            padding: 0,
            minWidth: '25px',
          }}
          onClick={handlePrev}
        >
          ←
        </Button>
        <Box
          sx={{
            padding: 2,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MainImage image={images[step]} />
        </Box>

        <Button
          variant="contained"
          sx={{
            width: {
              xs: '20px',
              sm: '40px',
              md: '60px',
            },
            height: '80%',
            position: 'absolute',
            right: 0,
            display: images.length > 1 ? 'flex' : 'none',
            mr: '5px',
            padding: 0,
            minWidth: '30px',
          }}
          onClick={handleNext}
        >
          →
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
