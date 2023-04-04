const productModel = require('../model/productModel');

const testController = (req, res) => {
  const result = productModel.testModel();

  return res.status(200).send(result);
};

module.exports={
  testController,
}