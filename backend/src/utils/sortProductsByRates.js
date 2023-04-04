const sortProductsByRates = (products) => {
  if (!products) return;

  return products.sort((firstP, secondP) => {
    return secondP.rating.rate - firstP.rating.rate;
  });
};

module.exports = sortProductsByRates;