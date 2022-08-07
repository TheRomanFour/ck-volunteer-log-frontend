import { Juice } from "../../../providers/Juice";
import { Result } from "../../../interfaces/Result";
import { FetchResult } from "../../../interfaces/FetchResult";
import { Education } from "./educations.model";
import { IFetchOptions } from "../../../interfaces/IFetchOptions";
import { Injectable } from "@angular/core";

@Injectable()
export class EducationsService {

    constructor(private juice: Juice) {
    }

    get(id: string): Promise<Result<Education>> {
        return this.juice.getNoHeaders(`/api/education/${id}`);
    }

    fetch(page: number, pageSize: number, options: IFetchOptions): Promise<FetchResult<Education>> {
        return this.juice.postNoHeaders(`/api/educations/${page}/${pageSize}`, options)
    }

    create(data: any): Promise<Result<string>> {
        return this.juice.postNoHeaders('/api/education', data);
    }

    update(id: string, data: any): Promise<Result> {
        return this.juice.putNoHeaders('/api/education', data);
    }

    delete(id: string): Promise<Result> {
        return this.juice.deleteNoHeaders('/api/education');
    }
}
