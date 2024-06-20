import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface CartConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CartConfirmationDialog = ({ open, onClose, onConfirm }: CartConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText color="text.primary" sx={{ textAlign: 'center' }}>
          {t('Are you sure?')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          {t('Cancel')}
        </Button>
        <Button variant="contained" onClick={onConfirm} color="primary">
          {t('Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartConfirmationDialog;
