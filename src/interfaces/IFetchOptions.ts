import { ISort } from "./Sort";
import { ITerm } from "./ITerm";

export interface IFetchOptions {
    sort: ISort,
    filter: ITerm[]
}
