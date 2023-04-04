const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

module.exports = axiosInstance;
