const nodemailer = require('nodemailer');

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

const enquireProduct = async (productId, customerDetails) => {
  const { firstName, lastName, email, mobile } = customerDetails;
  // This should replaced by sale person's email address;
  const salePersonEmail = 'wenpeijs@gmail.com';

  // I choose to use nodemailer as it is free!! hmmm!!
  const auth = {
    user: 'officeworkcodetest@gmail.com',
    // Generate through gmail personal hub
    // For more help please check this stack-overflow down blew
    // https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
    pass: process.env.AUTH_EMAIL_PASSWORD,
  }
  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth,
  });
  const emailConfig = {
    from: auth.user,
    to: salePersonEmail,
    subject: '(DEV-USE-TEST-ONLY)A new enquiry from the customer',
    text: `${firstName} ${lastName} had enquired ${productId}, customer's email is ${email} and mobile is ${mobile}`,
  }

  emailTransporter.sendMail(emailConfig, (error, info) => {
    if (!!error) {
      console.warn(`An error occurs when sending email, please check backend logs and code comments.`);
    }

    console.log(`Email had sent to ${info?.accepted[0]}`);
  });

  return 'succeed';
};

module.exports = {
  getProducts,
  getFiveTopRatedProducts,
  getCategories,
  getProductsFromCategory,
  getProductBySearchInput,
  getProductById,
  enquireProduct,
};
