import { Component, OnInit } from '@angular/core';
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {EducationsService} from "../../../educations/educations.service";
import {InterventionModalComponent} from "./intervention-modal/intervention-modal.component";
import {InterventionDeleteModalComponent} from "./intervention-delete-modal/intervention-delete-modal.component";
import {InterventionEditModalComponent} from "./intervention-edit-modal/intervention-edit-modal.component";
import {Education} from "../../../educations/educations.model";

@Component({
    selector: 'app-interventions-listing',
    templateUrl: './interventions-listing.component.html',
    styleUrls: ['./interventions-listing.component.css']
})
export class InterventionsListingComponent implements OnInit {

    page: number = 0;
    pageSize: number = 10;
    options: IFetchOptions = {
        filter: [{
            property: 'type',
            fullText: false,
            language: false,
            term: 'intervention'
        }],
        sort: { prop: "email", dir: "asc" }
    };

    rows: Education[] = [];


    constructor(private interventions: EducationsService,
                private modal: NgbModal,
                private router: Router) {
    }


    async ngOnInit(): Promise<void> {
        await this.fetchEducations();
    }

     async fetchEducations() {
        const result = await this.interventions.fetch(this.page, this.pageSize, this.options);
        if (!result.success)
            return;

        this.rows = result.payload.items;
    }

    onSelect(event: any) {
        if (event.type !== "click")
            return;

        return this.router.navigate([`educations/details/${event.row._id}`]);
    }

    openInterventionWizard() {
        const modal = this.modal.open(InterventionModalComponent);
        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchEducations();
        });
    }

    openInterventionDelete(row:Education) {
        const modal = this.modal.open(InterventionDeleteModalComponent);
        modal.componentInstance.education_id = row._id;

        modal.result.then(async res => {
            if (!res.success)
                return;

            await this.fetchEducations();
        }, () => {});
    }

    openInterventionEdit(row: Education) {
        const modal = this.modal.open(InterventionEditModalComponent);
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
