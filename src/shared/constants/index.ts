import { Image } from '@commercetools/platform-sdk';

export const PRODUCT_DESCRIPTION_PLACEHOLDER = "Description isn't available";

export const PRODUCT_IMAGE_PLACEHOLDER: Image[] = [
  {
    url: 'images/empty-img.png',
    dimensions: { h: 1000, w: 1000 },
  },
];

export const BREADCRUMBS_NAME_MAP: { [key: string]: string } = {
  '/': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};
