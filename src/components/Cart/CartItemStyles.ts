import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { ITEM_MEDIA_HEIGHT } from './constants';

export const cartItemSx: SxProps<Theme> = {
  display: 'flex',
};

export const cartItemMediaSx: SxProps<Theme> = {
  height: ITEM_MEDIA_HEIGHT,
  width: '100%',
};
