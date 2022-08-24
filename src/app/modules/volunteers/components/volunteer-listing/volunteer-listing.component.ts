import { Component, OnDestroy, OnInit } from '@angular/core';
import { VolunteersService } from "../../volunteers.service";
import { IFetchOptions } from "../../../../../interfaces/IFetchOptions";
import { Volunteer } from "../../volunteers.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VolunteerModalComponent } from "./volunteer-modal/volunteer-modal.component";
import { VolunteerDeleteModalComponent } from "./volunteer-delete-modal/volunteer-delete-modal.component";
import { VolunteerEditModalComponent } from "./volunteer-edit-modal/volunteer-edit-modal.component";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";

@Component({
    selector: 'app-volunteer-listing',
    templateUrl: './volunteer-listing.component.html',
    styleUrls: ['./volunteer-listing.component.scss']
})
export class VolunteerListingComponent implements OnInit, OnDestroy {

    page: number = 0;
    pageSize: number = 10;
    options: IFetchOptions = {
        filter: [],
        sort: { prop: "email", dir: "asc" }
    };

    rows: Volunteer[] = [];

    searchInput: FormControl = new FormControl<any>("");
    subject: Subject<any> = new Subject<any>();

    constructor(private volunteers: VolunteersService,
                private modal: NgbModal,
                private router: Router) {
    }

    ngOnDestroy(): void {
       this.subject.next(null);
       this.subject.complete();
    }

    async ngOnInit(): Promise<void> {
        await this.fetchVolunteers();
        this.searchInput.valueChanges
            .pipe(debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.subject))
            .subscribe(async value => {
                await this.fetchVolunteers(value);
            })
    }

    private async fetchVolunteers(term?: string) {
        const result = await this.volunteers.fetch(this.page, this.pageSize, this.options, term);
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
        modal.componentInstance.row = row;
        modal.result.then(async res => {
            if (!res.success){
                return;
            }


            await this.fetchVolunteers();
        });
    }



    Filter() {
//        const lowerValue = filterValue.toLowerCase();
//        this.filteredList = this.items.filter(item => item.name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
    }
}
