import { fetchProducts } from '../fetchProducts.js';

const getProducts = async () => {
  try {
    const products = await fetchProducts();
    return products;
  } catch(error) {
    return error;
  }
}

export const getProductsList = async (event) => {
  const products = await getProducts();

  if (!products) {
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
}

