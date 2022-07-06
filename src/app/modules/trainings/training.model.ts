import { MultiLanguageString } from "../../../interfaces/MultilanguageString";

export type Training = {
    created: Date;
    updated: Date;

    salutation: string;
    title: string;
    name: string;
    description: string;
    hours: number;
    phone: string;
    email: string;
    type: string;
    addresses: Array<Address>;
    attributes: any;
    media: Array<EntityMedia>;

}

declare type EntityMedia = {
    _id: string;
    created: Date;
    updated: Date;
    title: MultiLanguageString;
    fileName: string;
    mediaType: 'image' | 'document' | 'video';
    type: string;
    path: string;
    description?: MultiLanguageString;
    attributes: any;
}

export declare type Address = {
    name?: string;
    department?: string;
    email?: string;
    street: string;
    streetNumber?: string;
    streetExtended?: string;
    postcode: string;
    city: string;
    state?: string;
    county?: string;
    country: string;
    type?: string;
    deleted?: boolean;
    active?: boolean;
    attributes?: any;
    created?: Date;
    updated?: Date;
    meta?: {
        dataProvider: {
            ref: string;
            externalId: string;
            lastUpdate: Date;
        };
    };
}

export declare type AddressFormData = {
    _id?: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    type?: string;
};
