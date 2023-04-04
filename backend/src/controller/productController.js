const productModel = require('../model/productModel');

const getProducts = async (req, res) => {
  const products = await productModel.getFiveTopRatedProducts();

  if (!products) {
    res.status(500).send('Error occurs in backend, please check the backend logs.')
  }

  return res.status(200).send(products);
};

module.exports={
  getProducts,
}