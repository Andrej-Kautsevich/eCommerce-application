import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { ITEM_MEDIA_HEIGHT, ITEM_MEDIA_WIDTHS } from '../../constants';

export const cartItemSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  pt: 2,
  pb: 2,
};

export const cartItemMediaSx: SxProps<Theme> = {
  height: ITEM_MEDIA_HEIGHT,
  width: ITEM_MEDIA_WIDTHS,
  objectFit: 'contain',
};

export const cartItemInfoSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

export const cartItemRemoveSx: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  right: 0,
};
