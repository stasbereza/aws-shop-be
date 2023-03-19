import { sns } from '../aws.js';
import { putItemsIntoDynamoDB } from '../utils/DynamoDB.js';

export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({ body }) => JSON.parse(body));

  if (!products || !products?.length) {
    throw new Error('No records!');
  }

  try {
    await putItemsIntoDynamoDB(products, process.env.PRODUCTS_TABLE);

    sns.publish({
      Subject: 'Products created!',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN,
    }, () => {
      console.log('Notification sent!');
    });

    return {
      statusCode: 200,
      body: JSON.stringify('catalogBatchProcess successeed!'),
    }
  } catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    } 
  }
}