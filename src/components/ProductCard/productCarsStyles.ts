import { SxProps, Theme } from '@mui/material';
import { CARD_HEIGHT, CARD_MAX_HEIGHT, CARD_MEDIA_HEIGHT } from './constants';

export const productCardSx: SxProps<Theme> = {
  // maxWidth: CARD_MAX_WIDTH,
  maxHeight: CARD_MAX_HEIGHT,
  height: CARD_HEIGHT,
};

export const productCardMediaSx: SxProps<Theme> = {
  height: CARD_MEDIA_HEIGHT,
};

export const productCardContentSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

export const productCardActionSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'space-between',
  height: '100%',
  width: '100%',
};
