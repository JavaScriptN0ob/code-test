const axiosInstance = require('../axios/axiosInstance');
const sortProductsByRates = require('../utils/sortProductsByRates');
const sliceProducts = require('../utils/sliceProducts');
const displayErrorToLog = require('../utils/displayErrorToLog');

const getProducts = async () => {
  try {
    const { data } =  await axiosInstance.get('/products');

    return data;
  } catch (error) {
    displayErrorToLog(error);
    // console.warn(`Error occurs when calling fake store api. Error: ${error.message || error.cause}`);
  }
};

const getFiveTopRatedProducts = async () => {
  try {
    const products = await getProducts();

    return sliceProducts(sortProductsByRates(products), 5);
  } catch (error) {
    displayErrorToLog(error);
  }
}

module.exports = {
  getProducts,
  getFiveTopRatedProducts,
};
