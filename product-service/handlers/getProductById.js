const products = require('../mockProducts.json');

function findProductById(productId) {
  return new Promise((resolve) => {
    const product = products.find(product => product.id === productId);
    setTimeout(() => {
      resolve(product);
    }, 500);
  });
}

async function getProduct(productId) {
  try {
    const response = await findProductById(productId);
    return response;
  } catch(error) {
    return error;
  }
}

module.exports.getProductById = async (event) => {
  const { productId } = event.pathParameters;

  const foundProduct = await getProduct(productId);

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
