import { putItemsIntoDynamoDB } from "../utils/DynamoDB.js";
import { sendNotifications } from "../utils/sns.js";

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => JSON.parse(body));

  if (!products || !products?.length) {
    throw new Error("No records!");
  }

  try {
    await putItemsIntoDynamoDB(products, process.env.PRODUCTS_TABLE);
    await sendNotifications(products);

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
