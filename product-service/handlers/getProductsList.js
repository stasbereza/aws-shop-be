const products = require('../mockProducts.json');

function fetchProducts(products) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
}

async function getProducts() {
  try {
    const response = await fetchProducts(products);
    return response;
  } catch(error) {
    return error;
  }
}

module.exports.getProductsList = async (event) => {
  const products = await getProducts();

  if (!products || !products.length) {
    return {
      statusCode: 404,
      body: JSON.stringify('Products not found!'),
    }
  }

  const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET"
  };
  
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(products),
  };
};

