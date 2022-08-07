import { MultiLanguageString } from "../../../interfaces/MultilanguageString";

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

