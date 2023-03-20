import AWS from "aws-sdk";

const sns = new AWS.SNS({ region: process.env.REGION });

export const sendNotifications = async (products) => {
  await sns
    .publish(
      {
        Subject: "Products created!",
        Message: JSON.stringify(products),
        TopicArn: process.env.SNS_ARN,
      },
      () => {
        console.log("Notification sent!");
      }
    )
    .promise();
};
