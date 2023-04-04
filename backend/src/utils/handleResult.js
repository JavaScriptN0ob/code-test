const handleResult = (result, response) => {
  if (!result) return response.status(500).send('Error occurs in backend, please check the backend logs.');

  return response.status(200).send(result);
};

module.exports = handleResult;
