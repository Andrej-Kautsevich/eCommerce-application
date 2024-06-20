import { Box, SxProps, Theme, alpha, styled } from '@mui/material';
import { CARD_IMG_MD_HEIGHT, CARD_IMG_SM_HEIGHT, CARD_IMG_XS_HEIGHT } from './constants';

export const productCardSx: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
};

export const productCardMediaSx: SxProps<Theme> = {
  width: '100%',
  height: { xs: CARD_IMG_XS_HEIGHT, sm: CARD_IMG_SM_HEIGHT, md: CARD_IMG_MD_HEIGHT },
};

export const productCardContentSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
  p: 1,
};

export const productCardActionSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  height: '85%',
  width: '100%',
};

export const HoverBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.main, 0),
  transition: theme.transitions.create(['backgroundColor', 'opacity']),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.75),
    opacity: 1,
  },
  '&:not(:hover)': {
    opacity: 0,
  },
}));
