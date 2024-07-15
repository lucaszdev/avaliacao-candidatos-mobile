import { Request, Response } from "express";
import { UserEmail } from "../db/models/user";
import { UserPhone } from "../db/models/phone";
import { UserAddress } from "../db/models/address";

export const getAllUserAddress = async (req: Request, res: Response) => {
    const { idUser } = req?.params;

    UserAddress.findAll({ where: { userId: idUser }, order: [["id", "ASC"]] })
        .then((address) => {
            return res.status(200).json({
                status: 200,
                message: `All user address!`,
                address,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({
                status: 400,
                message: `Error trying to get all user address.`,
            });
        });
};

export const createUserAddress = async (req: Request, res: Response) => {
    const {
        cep,
        numero,
        logradouro,
        bairro,
        complemento,
        estado,
        cidade,
        userId,
    } = req.body;

    await UserAddress.create({
        cep,
        numero,
        logradouro,
        bairro,
        complemento,
        estado,
        cidade,
        userId,
    })
        .then((address) => {
            return res.status(200).json({
                status: 200,
                message: `User address created`,
                address,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to create the address. Reason: ${reason}`,
            });
        });
};

export const changeDefaultAddress = async (req: Request, res: Response) => {
    const { addressId, addressStatus, oldDefaultAddressId } = req.body;

    await UserAddress.update(
        { isDefault: addressStatus },
        { where: { id: oldDefaultAddressId } }
    )
        .then(async (_) => {
            await UserAddress.update(
                { isDefault: addressStatus },
                { where: { id: addressId } }
            )
                .then((_) => {
                    return res.status(200).json({
                        status: 200,
                        message: `Changed the new default address!`,
                    });
                })
                .catch((_) => {
                    return res.status(400).json({
                        status: 400,
                        message: `Error trying to change default address!`,
                    });
                });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to change default address!`,
            });
        });
};

export const updateUserAddress = async (req: Request, res: Response) => {
    const {
        cep,
        numero,
        logradouro,
        bairro,
        complemento,
        estado,
        cidade,
        addressId,
    } = req.body;

    console.log(req.body);

    await UserAddress.update(
        {
            cep,
            numero,
            logradouro,
            bairro,
            complemento,
            estado,
            cidade,
        },
        { where: { id: addressId } }
    )
        .then(async (_) => {
            return res.status(200).json({
                status: 200,
                message: `User address updated`,
            });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to update the address. Reason: ${reason}`,
            });
        });
};

export const deleteAddress = async (req: Request, res: Response) => {
    const { addressId } = req?.params;

    await UserAddress.destroy({ where: { id: addressId } })
        .then(async (_) => {
            return res.status(200).json({
                status: 200,
                message: `Address removed!`,
            });
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Error trying to delete address!`,
            });
        });
};
