import db from "../../config/database.config";
import { DataType } from "sequelize-typescript";
import { UserDocumentInstance } from "../../interfaces/user.interfaces";

const UserDocument = db.define<UserDocumentInstance>(
    "user_documents",
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        documentPicture: {
            type: DataType.STRING,
            allowNull: true,
            unique: true,
        },
        proofResidence: {
            type: DataType.STRING,
            allowNull: true,
            unique: true,
        },
        userId: {
            type: DataType.INTEGER,
            references: { model: "users", key: "id" },
        },
    },
    {
        freezeTableName: true,
        modelName: "user_document",
    }
);

export { UserDocument };
