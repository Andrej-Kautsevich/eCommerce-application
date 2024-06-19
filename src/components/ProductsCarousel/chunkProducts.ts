import { ProductProjection } from '@commercetools/platform-sdk';

const chunkProducts = (products: ProductProjection[], size: number) => {
  const chunksProd = products.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    const newChunks = [...chunks];
    if (!newChunks[chunkIndex]) {
      newChunks[chunkIndex] = []; // start a new chunk
    }
    newChunks[chunkIndex].push(item);
    return newChunks;
  }, [] as ProductProjection[][]);
  return chunksProd;
};

export default chunkProducts;
