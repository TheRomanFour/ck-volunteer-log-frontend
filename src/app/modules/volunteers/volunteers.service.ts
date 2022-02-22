import { Juice } from "../../../providers/Juice";
import { Result } from "../../../interfaces/Result";
import { FetchResult } from "../../../interfaces/FetchResult";
import { Volunteer } from "./volunteers.model";
import { IFetchOptions } from "../../../interfaces/IFetchOptions";
import { Injectable } from "@angular/core";

@Injectable()
export class VolunteersService {

    constructor(private juice: Juice) {
    }

    get(id: string): Promise<Result<Volunteer>> {
        return this.juice.getNoHeaders(`/api/volunteer/${id}`);
    }

    fetch(page: number, pageSize: number, options: IFetchOptions): Promise<FetchResult<Volunteer>> {
        return this.juice.postNoHeaders(`/api/volunteer/${page}/${pageSize}`, options)
    }

    create(data: any): Promise<Result<string>> {
        return this.juice.postNoHeaders('/api/volunteer', data);
    }

    update(id: string, data: any): Promise<Result> {
        return this.juice.putNoHeaders('/api/volunteer', data);
    }

    delete(id: string): Promise<Result> {
        return this.juice.deleteNoHeaders('/api/volunteer');
    }
}
