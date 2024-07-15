import { Model, Optional } from "sequelize";

// UserAttributes

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

//  EmailAttributes

export interface UserEmailAttributes {
    id: number;
    emailOwner: string;
    email: string;
    userId: number;
    isDefault: boolean;
}

interface UserEmailCreationAttributes
    extends Optional<UserEmailAttributes, "id" | "isDefault"> {}

export interface UserEmailInstance
    extends Model<UserEmailAttributes, UserEmailCreationAttributes>,
        UserEmailAttributes {}

// UserPhoneAttributes

export interface UserPhoneAttributes {
    id: number;
    phoneOwner: string;
    phone: string;
    userId: number;
    isDefault: boolean;
}

interface UserPhoneCreationAttributes
    extends Optional<UserPhoneAttributes, "id" | "isDefault"> {}

export interface UserPhoneInstance
    extends Model<UserPhoneAttributes, UserPhoneCreationAttributes>,
        UserPhoneAttributes {}

// UserAddressAttributes

export interface UserAddressAttributes {
    id: number;
    cep: string;
    numero: number;
    logradouro: string;
    bairro: string;
    complemento: string;
    estado: string;
    cidade: string;
    userId: number;
    isDefault: boolean;
}

interface UserAddressCreationAttributes
    extends Optional<UserAddressAttributes, "id" | "isDefault"> {}

export interface UserAddressInstance
    extends Model<UserAddressAttributes, UserAddressCreationAttributes>,
        UserAddressAttributes {}

// UserDocumentAttributes

export interface UserDocumentAttributes {
    id: number;
    documentPicture: string;
    proofResidence: string;
    userId: number;
}

interface UserDocumentCreationAttributes
    extends Optional<
        UserDocumentAttributes,
        "id" | "documentPicture" | "proofResidence"
    > {}

export interface UserDocumentInstance
    extends Model<UserDocumentAttributes, UserDocumentCreationAttributes>,
        UserDocumentAttributes {}
