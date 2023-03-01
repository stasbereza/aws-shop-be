const fetchProducts = require('../fetchProducts');

const findProductById = async (productId) => {
  try {
    const products = await fetchProducts();
    const product = products.find(product => product.id === productId);

    return product;
  } catch(error) {
    return error;
  }
}

module.exports.getProductById = async (event) => {
  const { productId } = event.pathParameters;

  const foundProduct = await findProductById(productId);

  if (!foundProduct) {
    return {
      statusCode: 404,
      body: JSON.stringify('Product not found!'),
    }
  }

  const product = {
    [productId]: foundProduct,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
