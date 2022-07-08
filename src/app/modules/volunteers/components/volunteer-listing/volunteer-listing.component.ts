import { Component, OnInit } from '@angular/core';
import { VolunteersService } from "../../volunteers.service";
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { Volunteer } from "../../volunteers.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VolunteerModalComponent } from "./volunteer-modal/volunteer-modal.component";
import {VolunteerDeleteModalComponent} from "./volunteer-delete-modal/volunteer-delete-modal.component";

@Component({
    selector: 'app-volunteer-listing',
    templateUrl: './volunteer-listing.component.html',
    styleUrls: ['./volunteer-listing.component.scss']
})
export class VolunteerListingComponent implements OnInit {

    page: number = 0;
    pageSize: number = 10;
    options: IFetchOptions = {
        filter: [],
        sort: { prop: "email", dir: "asc" }
    };

    rows: Volunteer[] = [];

    test = "Test";

    constructor(private volunteers: VolunteersService,
                private modal: NgbModal) {
    }

    async ngOnInit(): Promise<void> {
        await this.fetchVolunteers();
    }

    private async fetchVolunteers() {
        const result = await this.volunteers.fetch(this.page, this.pageSize, this.options);
        if (!result.success)
            return;

        this.rows = result.payload.items;
        console.log(result);
    }

    onSubmit(){

    }

    openVolunteerWizard() {
        const modal = this.modal.open(VolunteerModalComponent);
        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchVolunteers();
        });
    }

    onSelect(event: Event & any) {
        if (event.type !== "click")
            return;
        //modal.componentInstance.id = event.row._id;
    }

    //Here you need to pass reference from HTML
    openVolunteerDelete(row: Volunteer) {
        const modal = this.modal.open(VolunteerDeleteModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        modal.componentInstance.volunteer_id = row._id;
        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchVolunteers();
        });
    }


    delete(){
        console.log("obrisi")
    }

}
