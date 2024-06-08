import { Box, SxProps, Theme, alpha, styled } from '@mui/material';
import { CARD_MEDIA_HEIGHT } from './constants';

export const productCardSx: SxProps<Theme> = {
  height: '100%',
};

export const productCardMediaSx: SxProps<Theme> = {
  height: CARD_MEDIA_HEIGHT,
  width: '100%',
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
};

export const productCardActionSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'space-between',
  height: '100%',
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
