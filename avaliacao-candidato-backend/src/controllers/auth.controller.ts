require("dotenv").config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { User } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response) => {
    const { email, password } = req?.body;

    User.findOne({ where: { email } })
        .then(async (user) => {
            const verifyPassword = await bcrypt.compare(
                password,
                user?.password!
            );

            const token = jwt.sign({ sub: user?.id }, process.env.JWTPASS!, {
                expiresIn: "7d",
            });

            if (verifyPassword) {
                res.status(200).json({
                    status: 200,
                    message: "Authenticated with successfully!",
                    user,
                    token,
                });
            }
        })
        .catch((_) => {
            return res.status(400).json({
                status: 400,
                message: `Failed to log in! email not exists!`,
            });
        });
};

export const loginWithToken = (req: Request, res: Response) => {
    const { token } = req?.body;

    const tokenIsValid = jwt.verify(token, process.env.JWTPASS!);

    if (tokenIsValid) {
        const decodedToken = jwt.decode(token)?.sub;

        User.findOne({ where: { id: String(decodedToken) } })
            .then(async (user) => {
                res.status(200).json({
                    status: 200,
                    message: "Authenticated with successfully!",
                    user,
                });
            })
            .catch((_) => {
                return res.status(400).json({
                    status: 400,
                    message: `Failed to log in! email not find!`,
                });
            });
    } else
        return res.status(400).json({
            status: 400,
            message: `Failed to log in!`,
        });
};
