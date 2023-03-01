const products = require('./mockProducts.json');

const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}

module.exports = fetchProducts;