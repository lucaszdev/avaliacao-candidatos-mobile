import db from "../../config/database.config";
import { DataType } from "sequelize-typescript";
import { UserPhoneInstance } from "../../interfaces/user.interfaces";

const UserPhone = db.define<UserPhoneInstance>(
    "user_phones",
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        phoneOwner: {
            type: DataType.STRING,
            allowNull: false,
        },
        phone: {
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
        modelName: "user_phone",
    }
);

export { UserPhone };
