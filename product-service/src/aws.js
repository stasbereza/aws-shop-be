import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.REGION,
});

const dynamoDBDocClient = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS({ region: process.env.REGION });

export { dynamoDBDocClient, sns };
