import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REGION,
});

const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient();

export const putItem = async (params) => {
  await dynamoDBDocClient.put(params).promise();
};

export const queryItem = async (id) => {
  const queryResults = await dynamoDBDocClient
    .query({
      TableName: process.env.PRODUCTS_TABLE,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": id },
    })
    .promise();

  if (!queryResults.Items || queryResults.Items?.length === 0) {
    throw new Error("Product not found!");
  }

  return queryResults.Items;
};

export const scanTable = async (tableName, entity) => {
  const scanResults = await dynamoDBDocClient
    .scan({
      TableName: tableName,
    })
    .promise();

  if (!scanResults.Items || scanResults.Items?.length === 0) {
    throw new Error(`${entity} not found!`);
  }

  return scanResults.Items;
};
