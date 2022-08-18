import { Component, OnInit } from '@angular/core';
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Education } from "../../educations.model";
import { EducationModalComponent } from "./education-modal/education-modal.component";
import { EducationDeleteModalComponent } from "./education-delete-modal/education-delete-modal.component";
import { EducationsService } from "../../educations.service";
import { EducationEditModalComponent } from "./education-edit-modal/education-edit-modal.component";
import {Router} from "@angular/router";

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


    constructor(private educations: EducationsService,
                private modal: NgbModal,
                private router: Router) {
    }


    async ngOnInit(): Promise<void> {
        await this.fetchEducations();
    }

     async fetchEducations() {
        const result = await this.educations.fetch(this.page, this.pageSize, this.options);
        if (!result.success)
            return;

        this.rows = result.payload.items;
    }

    onSelect(event: any) {
        if (event.type !== "click")
            return;

        return this.router.navigate([`educations/details/${event.row._id}`]);
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
        }, () => {});
    }

    openEducationEdit(row: Education) {
        const modal = this.modal.open(EducationEditModalComponent);


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
