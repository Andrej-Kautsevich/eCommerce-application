import { Box, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from '@commercetools/platform-sdk';
import MainImage from './MainImage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: '650px',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
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
          sx={{ height: 30, position: 'absolute', left: 0, display: images.length > 1 ? 'flex' : 'none', ml: '10px' }}
          onClick={handlePrev}
        >
          ←
        </Button>
        <MainImage image={images[step]} />
        <Button
          variant="contained"
          sx={{ height: 30, position: 'absolute', right: 0, display: images.length > 1 ? 'flex' : 'none', mr: '10px' }}
          onClick={handleNext}
        >
          →
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
