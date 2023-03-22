import { putItem } from "../utils/DynamoDB.js";
import { sendNotification } from "../utils/sns.js";

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => JSON.parse(body));

  if (!products || !products?.length) {
    throw new Error("No records!");
  }

  try {
    for (const product of products) {
      const params = {
        TableName: process.env.PRODUCTS_TABLE,
        Item: product,
      };

      await putItem(params);
      await sendNotification(product);
    }

    return {
      statusCode: 200,
      body: JSON.stringify("catalogBatchProcess successeed!"),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
