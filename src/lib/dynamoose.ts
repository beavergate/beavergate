import { DynamoDB } from "@aws-sdk/client-dynamodb";
import dynamoose from "dynamoose";

// Configure the AWS SDK
const ddb = new DynamoDB({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Set DynamoDB instance for Dynamoose
dynamoose.aws.ddb.set(ddb);

export default dynamoose;
