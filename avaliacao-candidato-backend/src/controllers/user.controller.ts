require("dotenv").config({ path: __dirname + "/../../.env" });

import { Request, Response } from "express";
import { User, UserEmail } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { generateUUID, isTokenValid, sha256Hex } from '../util';

export const getUsers = (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        message: "Test Success",
    });
};

export const createUser = async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt
        .hash(req?.body?.password, 10)
        .then((hash) => {
            return hash;
        })
        .catch((err) => console.error(err.message));

    if (!hashedPassword) {
        return res.status(400).json({
            status: 400,
            message: `Failed to create the user.`,
        });
    }

    await User.create({
        name: req?.body?.name,
        email: req?.body?.email,
        password: hashedPassword,
    })
        .then((user) => {
            UserEmail.create({
                emailOwner: user?.name,
                email: user?.email,
                userId: user?.id,
            })
                .then((_) => {
                    const token = jwt.sign(
                        { sub: user.id },
                        process.env.JWTPASS!,
                        {
                            expiresIn: "7d",
                        }
                    );

                    return res.status(200).json({
                        status: 200,
                        message: "User created.",
                        user,
                        token,
                    });
                })
                .catch(async (reason) => {
                    await User.destroy();
                    return res.status(400).json({
                        status: 400,
                        message: `Failed to create the user. Reason: ${reason}`,
                    });
                });
        })
        .catch((reason) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to create the user. Reason: ${reason}`,
            });
        });
};

export const changePassword = async (req: Request, res: Response) => {
    const { userId, userPassword, newUserPassword } = req?.body;

    await User.findOne({ where: { id: userId } }).then(async (user) => {
        const verifyPassword = await bcrypt.compare(
            userPassword,
            user?.password!
        );

        if (verifyPassword) {
            const hashedPassword = await bcrypt
                .hash(newUserPassword, 10)
                .then((hash) => {
                    return hash;
                });

            if (!hashedPassword) {
                return res.status(400).json({
                    status: 400,
                    message: `Failed to change user password!`,
                });
            }

            await User.update(
                { password: hashedPassword },
                { where: { id: user?.id } }
            )
                .then((_) => {
                    return res.status(200).json({
                        status: 200,
                        message: `User password successfully changed`,
                    });
                })
                .catch((_) => {
                    return res.status(400).json({
                        status: 400,
                        message: `Error trying to change user password!`,
                    });
                });
        } else {
            return res.status(400).json({
                status: 400,
                message: `The user password is invalid!`,
            });
        }
    });
};
