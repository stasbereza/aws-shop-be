import { dynamoDBDocClient } from '../aws.js';

export const putItem = async (params) => {
  await dynamoDBDocClient.put(params).promise();
};

export const queryItem = async (id) => {
  const queryResults = await dynamoDBDocClient.query({
    TableName: process.env.PRODUCTS_TABLE,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
  }).promise();

    if (!queryResults.Items ||  queryResults.Items?.length === 0) {
    throw new Error('Product not found!');
  }

  return queryResults.Items;
}

export const scanTable = async (tableName, entity) => {
  const scanResults = await dynamoDBDocClient.scan({
    TableName: tableName,
  }).promise();

  if (!scanResults.Items ||  scanResults.Items?.length === 0) {
    throw new Error(`${entity} not found!`);
  }
  
  return scanResults.Items;
}

export const putItemsIntoDynamoDB = (items, tableName) => {
  return new Promise((resolve, reject) => {
    items.forEach((item) => {
      const params = {
        TableName: tableName,
        Item: item,
      };

      dynamoDBDocClient.put(params, (err, data) => {
        if (err) {
          console.error('Unable to add item. Error: ', JSON.stringify(err, null, 2));
          reject(err);
        } else {
          console.log('PutItem succeeded:', item);
          resolve(data);
        };
      });
    });
  });
}