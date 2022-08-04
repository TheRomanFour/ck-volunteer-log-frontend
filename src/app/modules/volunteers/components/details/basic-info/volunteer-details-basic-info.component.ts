import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VolunteersService } from "../../../volunteers.service";

@Component({
    templateUrl: "./volunteer-details-basic-info.component.html"
})
export class VolunteerDetailsBasicInfoComponent implements OnInit {

    constructor(private aRouter: ActivatedRoute,
                private volunteerService: VolunteersService) {
    }

    volunteer: any;

    async ngOnInit(): Promise<void> {
        const id = this.aRouter.snapshot.parent?.params?.['id'];

        await this.fetchVolunteer(id);
    }

    async fetchVolunteer(_id: string) {
        const result = await this.volunteerService.get(_id);

        this.volunteer = result.payload;
    }
}
