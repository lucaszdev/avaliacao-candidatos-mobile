import { Request, Response } from "express";
import { UserEmail } from "../db/models/user";
import { UserPhone } from "../db/models/phone";

export const getAllUserPhones = async (req: Request, res: Response) => {
    const { idUser } = req?.params;

    UserPhone.findAll({ where: { userId: idUser }, order: [["id", "ASC"]] })
        .then((phones) => {
            return res.status(200).json({
                status: 200,
                message: `All user phones!`,
                phones,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to get all user phones.`,
            });
        });
};

export const createUserPhone = async (req: Request, res: Response) => {
    const { phone, userId, phoneOwner } = req.body;

    await UserPhone.create({
        phoneOwner,
        phone,
        userId,
    })
        .then((email) => {
            return res.status(200).json({
                status: 200,
                message: `User phone created`,
                email,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to create the phone. Reason: ${reason}`,
            });
        });
};

export const changeDefaultPhone = async (req: Request, res: Response) => {
    const { phoneId, phoneStatus, oldDefaultPhoneId } = req.body;

    await UserPhone.update(
        { isDefault: false },
        { where: { id: oldDefaultPhoneId } }
    )
        .then(async (_) => {
            await UserPhone.update(
                { isDefault: phoneStatus },
                { where: { id: phoneId } }
            )
                .then((_) => {
                    return res.status(200).json({
                        status: 200,
                        message: `Changed the new default phone!`,
                    });
                })
                .catch((_) => {
                    return res.status(400).json({
                        status: 400,
                        message: `Error trying to change default phone!`,
                    });
                });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to change default phone!`,
            });
        });
};

export const updateUserPhone = async (req: Request, res: Response) => {
    const { phone, phoneOwner, phoneId } = req.body;

    await UserPhone.update(
        {
            phone,
            phoneOwner,
        },
        { where: { id: phoneId } }
    )
        .then(async (_) => {
            return res.status(200).json({
                status: 200,
                message: `User phone updated`,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to update the phone. Reason: ${reason}`,
            });
        });
};

export const deletePhone = async (req: Request, res: Response) => {
    const { phoneId } = req?.params;

    await UserPhone.destroy({ where: { id: phoneId } })
        .then(async (_) => {
            return res.status(200).json({
                status: 200,
                message: `Phone removed!`,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to delete phone!`,
            });
        });
};
