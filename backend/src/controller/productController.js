const productModel = require('../model/productModel');
const handleResult = require('../utils/handleResult');

const getProducts = async (_, res) => {
  const products = await productModel.getFiveTopRatedProducts();

  // if (!products) {
  //   res.status(500).send('Error occurs in backend, please check the backend logs.')
  // }

  // return res.status(200).send(products);
  handleResult(products, res);
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