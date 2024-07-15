import { Request, Response } from "express";
import { uploadToS3 } from "../utils/functions";
import { configDotEnv } from "../config/dotenv.config";
import { UserDocument } from "../db/models/document";

export const getUserDocument = async (req: Request, res: Response) => {
    const { idUser } = req?.params;

    await UserDocument.findOne({
        where: { userId: idUser },
        order: [["id", "ASC"]],
    })
        .then((document) => {
            return res.status(200).json({
                status: 200,
                message: `User document!`,
                document: document,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to get user document.`,
            });
        });
};

export const UploadDocumentPicture = async (req: any, res: Response) => {
    const { userId } = req.body;
    try {
        if (req.file) {
            const result = await uploadToS3(
                req.file,
                configDotEnv.aws.bucket,
                "document"
            );

            const thereIsUserDocuments = await UserDocument.findOne({
                where: { userId },
            });

            if (thereIsUserDocuments) {
                await UserDocument.update(
                    {
                        documentPicture: result?.Location,
                    },
                    { where: { userId } }
                );
            } else {
                await UserDocument.create({
                    userId,
                    documentPicture: result?.Location,
                });
            }
            return res.status(200).json({
                status: 200,
                message: "Document picture uploaded with successfully!",
                body: result,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong!",
        });
    }
};

export const deleteDocumentPicture = async (req: any, res: Response) => {
    const { userId } = req.params;

    try {
        await UserDocument.update(
            {
                documentPicture: null,
            },
            { where: { userId } }
        );
        return res.status(200).json({
            status: 200,
            message: "Document picture removed with success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong!",
        });
    }
};

export const UploadProofResidence = async (req: any, res: Response) => {
    const { userId } = req.body;
    try {
        if (req.file) {
            const result = await uploadToS3(
                req.file,
                configDotEnv.aws.bucket,
                "proof_residence"
            );

            const thereIsUserDocuments = await UserDocument.findOne({
                where: { userId },
            });

            if (thereIsUserDocuments) {
                await UserDocument.update(
                    {
                        proofResidence: result?.Location,
                    },
                    { where: { userId } }
                );
            } else {
                await UserDocument.create({
                    userId,
                    proofResidence: result?.Location,
                });
            }
            return res.status(200).json({
                status: 200,
                message: "Proof residence uploaded with successfully!",
                body: result,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong!",
        });
    }
};

export const deleteProofResidence = async (req: any, res: Response) => {
    const { userId } = req.params;

    try {
        await UserDocument.update(
            {
                proofResidence: null,
            },
            { where: { userId } }
        );
        return res.status(200).json({
            status: 200,
            message: "Proof Residence removed with success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong!",
        });
    }
};
