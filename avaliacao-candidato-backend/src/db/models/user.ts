import { Model } from "sequelize";
import db from "../../config/database.config";
import { DataType } from "sequelize-typescript";

import {
    UserEmailInstance,
    UserInstance,
} from "../../interfaces/user.interfaces";

const User = db.define<UserInstance>(
    "users",
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        modelName: "user",
    }
);

const UserEmail = db.define<UserEmailInstance>(
    "user_emails",
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        emailOwner: {
            type: DataType.STRING,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataType.INTEGER,
            references: { model: "users", key: "id" },
        },
        isDefault: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
        modelName: "user_email",
    }
);

export { User, UserEmail };
