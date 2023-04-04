const axiosInstance = require('../axios/axiosInstance');
const sortProductsByRates = require('../utils/sortProductsByRates');
const sliceProducts = require('../utils/sliceProducts');
const displayErrorToLog = require('../utils/displayErrorToLog');

const getProducts = async () => {
  try {
    const { data: products } =  await axiosInstance.get('/products');

    return products;
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
};

const getCategories = async () => {
  try {
    const { data: categories } = await axiosInstance.get('/products/categories');

    return categories;
  } catch (error) {
    displayErrorToLog(error);
  }
};

const getProductsFromCategory = async (category) => {
  try {
    const { data: products } = await axiosInstance.get(`/products/category/${category}`)

    return sortProductsByRates(products);
  } catch (error) {
    displayErrorToLog(error);
  }
};

const getProductBySearchInput = async (searchInput) => {
  try {
    const products = await getProducts();

    const searchedProducts = products.filter((product) => {
      // It should return result(s) if title or description matched and without case sensitive.
      const { title, description } = product;

      const lowerCasedSearchInput = searchInput.toLowerCase();
      const lowerCasedTitle = title.toLowerCase();
      const lowerCasedDescription = description.toLowerCase();

      return lowerCasedTitle.includes(lowerCasedSearchInput) || lowerCasedDescription.includes(lowerCasedSearchInput);
    });

    // Incase searched products includes more than 1, I put them into a nested array;
    return [...searchedProducts]
  } catch (error) {
    displayErrorToLog(error);
  }
};

const getProductById = async (productId) => {
  try {
    const { data: product } = await axiosInstance.get(`/products/${productId}`);

    return product;
  } catch (error) {
    displayErrorToLog(error);
  }
};

module.exports = {
  getProducts,
  getFiveTopRatedProducts,
  getCategories,
  getProductsFromCategory,
  getProductBySearchInput,
  getProductById,
};
