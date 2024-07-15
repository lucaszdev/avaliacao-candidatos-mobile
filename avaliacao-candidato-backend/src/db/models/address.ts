import db from "../../config/database.config";
import { DataType } from "sequelize-typescript";
import { UserAddressInstance } from "../../interfaces/user.interfaces";

const UserAddress = db.define<UserAddressInstance>(
    "user_address",
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        cep: {
            type: DataType.STRING,
            allowNull: true,
        },
        numero: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        logradouro: {
            type: DataType.STRING,
            allowNull: false,
        },
        bairro: {
            type: DataType.STRING,
            allowNull: false,
        },
        complemento: {
            type: DataType.STRING,
            allowNull: true,
        },
        estado: {
            type: DataType.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataType.STRING,
            allowNull: false,
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
        modelName: "user_address",
    }
);

export { UserAddress };
