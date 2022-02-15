export interface ITerm {
    property: string;
    fullText: boolean;
    language: string | boolean;
    term: string;
    type?: SearchTermType;
    languages?: Array<string>;
}

export type SearchTermType = 'string' | 'int' | 'objectid' | 'multilang'
