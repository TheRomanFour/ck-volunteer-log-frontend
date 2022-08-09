import {MultiLanguageString} from "../../../interfaces/MultilanguageString";

export type Education = {
    created: Date;
    updated: Date;
    name: string;
    date_from: Date;
    date_to: Date;
    location: string;
    start_time?: string; //09:00
    maximum_participants: number;


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

