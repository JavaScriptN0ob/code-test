const sliceProducts = (products, numberOfProducts) => {
  if (!products || !numberOfProducts) return;

  return products.slice(0, numberOfProducts);
};

module.exports = sliceProducts;
