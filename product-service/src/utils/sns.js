import AWS from "aws-sdk";

const sns = new AWS.SNS({ region: process.env.REGION });

export const sendNotification = async (product) => {
  await sns
    .publish(
      {
        Subject: "Product creation notification",
        Message: `Product ${product.title} is created successfully!`,
        MessageAttributes: {
          price: { DataType: "Number", StringValue: product.price },
        },
        TopicArn: process.env.SNS_ARN,
      },
      () => {
        console.log("Notification sent!");
      }
    )
    .promise();
};
