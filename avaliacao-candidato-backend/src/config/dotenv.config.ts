import { config as dotEnv } from "dotenv";

dotEnv();

export const configDotEnv = {
    aws: {
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_REGION,
        access_key: process.env.AWS_ACCESS_KEY_ID,
        secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    },
};
