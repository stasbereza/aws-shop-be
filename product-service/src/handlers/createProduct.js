import { v4 as uuidv4 } from "uuid";
import { putItem } from "../utils/DynamoDB.js";

export const createProduct = async (event) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      id: uuidv4(),
      title: "newItem",
    },
  };

  try {
    await putItem(params);

    return {
      statusCode: 201,
      body: JSON.stringify("Product successfully created!"),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
