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
}

module.exports={
  getProducts,
  getCategories,
}