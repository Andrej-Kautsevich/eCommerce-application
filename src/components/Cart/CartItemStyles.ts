import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { ITEM_MEDIA_HEIGHT, ITEM_MEDIA_WIDTHS } from './constants';

export const cartItemSx: SxProps<Theme> = {
  display: 'flex',
  pt: 2,
  pb: 2,
};

export const cartItemMediaSx: SxProps<Theme> = {
  height: ITEM_MEDIA_HEIGHT,
  width: ITEM_MEDIA_WIDTHS,
  objectFit: 'contain',
  mr: 5,
};

export const cartItemInfo: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};
