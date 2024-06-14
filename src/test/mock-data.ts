import { LineItem } from '@commercetools/platform-sdk';

export const lineItemMock: LineItem = {
  id: '902fc130-a04c-440a-8ceb-b3b3f45b3287',
  productId: '98e43986-6e6e-4a49-9a10-e6975651858c',
  name: { en: 'Item 1' },
  productType: {
    typeId: 'product-type',
    id: 'b857c747-a9ef-40c2-ad06-5a577c5143fc',
  },
  variant: {
    id: 1,
    sku: 'SKMEI 1335',
    key: 'SKMEI 1335',
    prices: [
      {
        id: 'ffa8e076-c98b-4f43-9f03-9d8b3b39b851',
        value: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 21000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 10500,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: '2a383172-68a5-45b6-b11e-8d177b81467a',
          },
        },
      },
    ],
    images: [
      {
        url: 'https://resources.cdn-kaspi.kz/img/m/p/h5a/h13/64436671381534.jpg?format=gallery-large',
        label: '1',
        dimensions: {
          w: 604,
          h: 967,
        },
      },
      {
        url: 'https://resources.cdn-kaspi.kz/img/m/p/h77/h17/64436675248158.jpg?format=gallery-large',
        label: '2',
        dimensions: {
          w: 604,
          h: 967,
        },
      },
      {
        url: 'https://resources.cdn-kaspi.kz/img/m/p/h8d/h0f/64436678983710.jpg?format=gallery-large',
        label: '3',
        dimensions: {
          w: 1000,
          h: 1000,
        },
      },
    ],
    attributes: [
      {
        name: 'gender',
        value: {
          key: 'MEN',
          label: 'Men',
        },
      },
      {
        name: 'Digital',
        value: true,
      },
      {
        name: 'brand',
        value: {
          key: 'skmei',
          label: 'skmei',
        },
      },
      {
        name: 'Material',
        value: {
          key: 'stainless steel',
          label: 'stainless steel',
        },
      },
      {
        name: 'Colour',
        value: {
          key: 'silver',
          label: 'silver',
        },
      },
    ],
    assets: [],
  },
  price: {
    id: 'ffa8e076-c98b-4f43-9f03-9d8b3b39b851',
    value: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 21000,
      fractionDigits: 2,
    },
    discounted: {
      value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 10500,
        fractionDigits: 2,
      },
      discount: {
        typeId: 'product-discount',
        id: '2a383172-68a5-45b6-b11e-8d177b81467a',
      },
    },
  },
  quantity: 1,
  totalPrice: {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount: 10500,
    fractionDigits: 2,
  },
  discountedPricePerQuantity: [],
  taxedPricePortions: [],
  state: [
    {
      quantity: 1,
      state: {
        typeId: 'state',
        id: '3a6769e7-3bd5-4f14-9d7b-a9c3676b3887',
      },
    },
  ],
  perMethodTaxRate: [],
  priceMode: 'Platform',
  lineItemMode: 'Standard',
};

export const totalPriceMock = {
  type: 'centPrecision',
  currencyCode: 'USD',
  centAmount: 10500,
  fractionDigits: 2,
};
