import AWS from "aws-sdk";
import { configDotEnv } from "../config/dotenv.config";

export const uploadToS3 = async (
    file: any,
    bucketname: string,
    pictureType: string
) => {
    try {
        const s3 = new AWS.S3({
            credentials: {
                accessKeyId: configDotEnv.aws.access_key,
                secretAccessKey: configDotEnv.aws.secret_key,
            },
        });

        const newFileName = `${Date.now().toString()}_${pictureType}_picture.${
            file.mimetype.split("/")[1]
        }`;

        console.log(file);

        const params = {
            Bucket: bucketname,
            Key: newFileName,
            Body: Buffer.from(file?.buffer, "binary"),
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, {}, (error, data) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    } catch (error) {
        return error;
    }
};
