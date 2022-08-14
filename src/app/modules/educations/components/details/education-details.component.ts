import { Component } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {EducationsService} from "../../educations.service";

@Component({
    templateUrl: "./education-details.component.html",
    styleUrls: ['./education-details.component.scss']

})
export class EducationDetailsComponent {
    constructor(private aRouter: ActivatedRoute,
                private educationService: EducationsService) {
    }

    education : any;


    async ngOnInit(): Promise<void> {
        const id = this.aRouter.snapshot.parent?.params?.['id'];
        await this.fetchEducation(id);
    }

    async fetchEducation(_id: string) {
        const result = await this.educationService.get(_id);

        this.education = result.payload;
    }


}
