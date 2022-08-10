import { Component, OnInit } from '@angular/core';
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Education } from "../../educations.model";
import { EducationModalComponent } from "./education-modal/education-modal.component";
import { EducationDeleteModalComponent } from "./education-delete-modal/education-delete-modal.component";
import { EducationsService } from "../../educations.service";
import { EducationEditModalComponent } from "./education-edit-modal/education-edit-modal.component";

@Component({
    selector: 'app-education-listing',
    templateUrl: './education-listing.component.html',
    styleUrls: ['./education-listing.component.css']
})
export class EducationListingComponent implements OnInit {

    page: number = 0;
    pageSize: number = 10;
    options: IFetchOptions = {
        filter: [],
        sort: { prop: "email", dir: "asc" }
    };

    rows: Education[] = [];


    constructor(private educations: EducationsService, private modal: NgbModal) {
    }


    async ngOnInit(): Promise<void> {

        await this.fetchEducations();
        console.log(this.rows);
    }

     async fetchEducations() {
        const result = await this.educations.fetch(this.page, this.pageSize, this.options);
        if (!result.success)
            return;

        // @ts-ignore
        this.rows = result.payload.items;
        console.log("edukacija", result);


    }

    onSelect(event: Event & any) {
        if (event.type !== "click")
            return;

        console.log(event.row);

        //modal.componentInstance.id = event.row._id;
    }

    openEducationWizard() {
        const modal = this.modal.open(EducationModalComponent);
        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchEducations();
        });
    }

    openEducationDelete(row:Education) {

        const modal = this.modal.open(EducationDeleteModalComponent);
        modal.componentInstance.education_id = row._id;

        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchEducations();
        });
    }

    openEducationEdit(row: Education) {
        const modal = this.modal.open(EducationEditModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        /*modal.componentInstance.education_id = row._id;
        modal.componentInstance.education_name = row.name;
        modal.componentInstance.education_date_from = row.date_from;
        modal.componentInstance.education_date_to = row.date_to;
        modal.componentInstance.education_location = row.location;
        modal.componentInstance.education_start_time = row.start_time;
        modal.componentInstance.education_maximum_participants = row.maximum_participants;


         */

        modal.componentInstance.row = row;

        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchEducations();
        });
    }

    Filter() {
//        const lowerValue = filterValue.toLowerCase();
//        this.filteredList = this.items.filter(item => item.name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
    }
}
