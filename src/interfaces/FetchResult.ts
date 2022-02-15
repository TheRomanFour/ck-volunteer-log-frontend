export declare class Result<T = any> {
    constructor(payload?: any, error?: string);
    success: boolean;
    error?: string;
    payload: T;
}
export declare type FetchResult<T> = Result<{
    count: number;
    items: T[];
}>;
