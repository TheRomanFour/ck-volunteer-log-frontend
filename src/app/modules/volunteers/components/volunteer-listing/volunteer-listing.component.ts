import { Component, OnInit } from '@angular/core';
import { VolunteersService } from "../../volunteers.service";
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { Volunteer } from "../../volunteers.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VolunteerModalComponent } from "./volunteer-modal/volunteer-modal.component";
import { VolunteerDeleteModalComponent } from "./volunteer-delete-modal/volunteer-delete-modal.component";
import { VolunteerEditModalComponent } from "./volunteer-edit-modal/volunteer-edit-modal.component";
import { Router } from "@angular/router";

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

    constructor(private volunteers: VolunteersService,
                private modal: NgbModal,
                private router: Router) {
    }

    async ngOnInit(): Promise<void> {
        await this.fetchVolunteers();
    }

    private async fetchVolunteers() {
        const result = await this.volunteers.fetch(this.page, this.pageSize, this.options);
        if (!result.success)
            return;

        this.rows = result.payload.items;
    }

    onSubmit() {

    }

    openVolunteerWizard() {
        const modal = this.modal.open(VolunteerModalComponent);
        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchVolunteers();
        });
    }

    onSelect(event: any) {
        if (event.type !== "click")
            return;

        return this.router.navigate([`volunteers/details/${event.row._id}`]);
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

    openVolunteerEdit(row: Volunteer) {
        const modal = this.modal.open(VolunteerEditModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        modal.componentInstance.volunteer_id = row._id;
        modal.componentInstance.volunteer_firstname = row.firstname;
        modal.componentInstance.volunteer_lastname = row.lastname;
        modal.componentInstance.volunteer_oib = row.attributes.oib;
        modal.componentInstance.volunteer_date_of_birth=row.attributes.date_of_birth;
        modal.componentInstance.volunteer_place_of_birth = row.attributes.place_of_birth;
        modal.componentInstance.volunteer_street = row.addresses[0].street;
        modal.componentInstance.volunteer_street_number = row.addresses[0].streetNumber;
        modal.componentInstance.volunteer_city = row.addresses[0].city;
        modal.componentInstance.volunteer_postcode = row.addresses[0].postcode;
        modal.componentInstance.volunteer_place_of_birth = row.attributes.place_of_birth;
        modal.componentInstance.volunteer_email = row.email;
        modal.componentInstance.volunteer_phone = row.phone;
        modal.componentInstance.volunteer_skills = row.attributes.skills;

        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchVolunteers();
        });
    }

    openVolunteerInfo(row: Volunteer) {
        const modal = this.modal.open(VolunteerEditModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        modal.componentInstance.volunteer_id = row._id;
        modal.componentInstance.volunteer_firstname = row.firstname;
        modal.componentInstance.volunteer_lastname = row.lastname;
        modal.componentInstance.volunteer_email = row.email;
        modal.componentInstance.volunteer_phone = row.phone;

        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchVolunteers();
        });
    }

    Filter() {
//        const lowerValue = filterValue.toLowerCase();
//        this.filteredList = this.items.filter(item => item.name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
    }
}
