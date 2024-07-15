export class EmailListAttributes {
    status: boolean;
    message: string;
    emails: Emails[];
}

export class Emails {
    id?: number;
    emailOwner: string;
    email: string;
    userId?: number;
    isDefault: boolean;
    createdAt?: Date;
    updateAt?: Date;
}

export class PhoneListAttributes {
    status: boolean;
    message: string;
    phones: Phones[];
}

export class Phones {
    id?: number;
    phoneOwner: string;
    phone: string;
    userId?: number;
    isDefault: boolean;
    createdAt?: Date;
    updateAt?: Date;
}

export class AddressListAttributes {
    status: boolean;
    message: string;
    address: Address[];
}

export class Address {
    id?: number;
    cep: string;
    numero: number;
    logradouro: string;
    bairro: string;
    complemento: string;
    estado: string;
    cidade: string;
    userId?: number;
    isDefault: boolean;
    createdAt?: Date;
    updateAt?: Date;
}

export class DocumentAttributes {
    status: boolean;
    message: string;
    document: Document;
}

export class Document {
    id?: number;
    documentPicture: string;
    proofResidence: string;
    userId?: number;
    createdAt?: Date;
    updateAt?: Date;
}
