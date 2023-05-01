import { queryItem } from "../utils/dynamoDB.js";

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const product = await queryItem(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product[0]),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error.message),
    };
  }
};
