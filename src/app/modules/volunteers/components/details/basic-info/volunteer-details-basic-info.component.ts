import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { VolunteersService } from "../../../volunteers.service";
import {VolunteerDeleteModalComponent} from "../../volunteer-listing/volunteer-delete-modal/volunteer-delete-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VolunteerEditModalComponent} from "../../volunteer-listing/volunteer-edit-modal/volunteer-edit-modal.component";

@Component({
    templateUrl: "./volunteer-details-basic-info.component.html",
    styleUrls: ["volunteer-details-basic.component.scss"]
})
export class VolunteerDetailsBasicInfoComponent implements OnInit {

    constructor(private aRouter: ActivatedRoute,
                private modal: NgbModal,
                private volunteerService: VolunteersService,
                private router: Router) {
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

    openVolunteerDelete(_id: string) {
        const modal = this.modal.open(VolunteerDeleteModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        modal.componentInstance.volunteer_id = _id;
        modal.result.then(async res => {
            if (!res.success) {
                return;
            }
            return this.router.navigate(['volunteers/']);
        });
    }

    openVolunteerEdit() {
        const modal = this.modal.open(VolunteerEditModalComponent)
        modal.componentInstance.row = this.volunteer;
        modal.result.then(async res => {
            if (!res.success) {
                return;
            }
             await this.ngOnInit();

        });
    }
}

