import { Request, Response } from "express";
import { User, UserEmail } from "../db/models/user";
import { where } from "sequelize";

export const getAllUserEmails = async (req: Request, res: Response) => {
    const { idUser } = req?.params;

    UserEmail.findAll({ where: { userId: idUser }, order: [["id", "ASC"]] })
        .then((emails) => {
            return res.status(200).json({
                status: 200,
                message: `All user emails!`,
                emails,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to get all user emails.`,
            });
        });
};

export const createUserEmail = async (req: Request, res: Response) => {
    const { email, userId, emailOwner } = req.body;

    await UserEmail.create({
        emailOwner,
        email,
        userId,
    })
        .then((email) => {
            return res.status(200).json({
                status: 200,
                message: `User email created`,
                email,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to create the email. Reason: ${reason}`,
            });
        });
};

export const updateUserEmail = async (req: Request, res: Response) => {
    const { email, emailOwner, emailId, isAccountEmail, userId } = req.body;

    await UserEmail.update(
        {
            email,
            emailOwner,
        },
        { where: { id: emailId } }
    )
        .then(async (_) => {
            if (isAccountEmail) {
                await User.update(
                    {
                        email: email,
                    },
                    { where: { id: userId } }
                );
            }
            return res.status(200).json({
                status: 200,
                message: `User email updated`,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to update the email. Reason: ${reason}`,
            });
        });
};

export const changeDefaultEmail = async (req: Request, res: Response) => {
    const { emailId, emailStatus, oldDefaultEmailId } = req.body;

    await UserEmail.update(
        { isDefault: false },
        { where: { id: oldDefaultEmailId } }
    )
        .then(async (_) => {
            await UserEmail.update(
                { isDefault: emailStatus },
                { where: { id: emailId } }
            )
                .then((_) => {
                    return res.status(200).json({
                        status: 200,
                        message: `Changed the new default email!`,
                    });
                })
                .catch((_) => {
                    return res.status(400).json({
                        status: 400,
                        message: `Error trying to change default email!`,
                    });
                });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to change default email!`,
            });
        });
};

export const deleteEmail = async (req: Request, res: Response) => {
    const { emailId } = req?.params;

    await UserEmail.destroy({ where: { id: emailId } })
        .then(async (_) => {
            return res.status(200).json({
                status: 200,
                message: `Email removed!`,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to delete email!`,
            });
        });
};
