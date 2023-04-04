const productModel = require('../model/productModel');
const handleResult = require('../utils/handleResult');

const getProducts = async (req, res) => {
  // I did this after getProductsFromCategory function.
  // I still prefer to stick with the correct format
  // So I decided to use query instead of params.
  const { searchInput } = req.query;

  if (!searchInput) {
    const products = await productModel.getFiveTopRatedProducts();
  
    // if (!products) {
    //   res.status(500).send('Error occurs in backend, please check the backend logs.')
    // }
  
    // return res.status(200).send(products);
    return handleResult(products, res);
  }

  const searchedProducts = await productModel.getProductBySearchInput(searchInput);

  if (!searchedProducts) {
    // I use customized https code for this response, to make frontend easier catching.
    return res.status(404).send('No matched product(s) found!');
  }
  
  handleResult(searchedProducts, res);
};

const getCategories = async (_, res) => {
  const categories = await productModel.getCategories();

  handleResult(categories, res);
};

const getProductsFromCategory = async (req, res) => {
  // Followed by fakestore common convention api use params, I do prefer use query for this!
  const { category } = req.params;

  // I made a silly mistake when I was log the result of this, due to I typed wrong category
  // So I decide to add a validation here.
  const validCategories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
  if (!validCategories.includes(category)) {
    return res.status(404).send('Invalid category!');
  }

  const products = await productModel.getProductsFromCategory(category);

  handleResult(products, res);
};

module.exports={
  getProducts,
  getCategories,
  getProductsFromCategory,
}