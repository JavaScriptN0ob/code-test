const displayErrorToLog = (error) => {
  return console.warn(`Error occurs when calling fake store api. Error: ${error.message || error.cause}`);
};

module.exports = displayErrorToLog;
