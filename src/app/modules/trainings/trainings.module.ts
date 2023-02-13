import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2PromiseButtonModule } from "angular2-promise-buttons";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TrainingsListingComponent} from "./components/trainings-listing/trainings-listing.component";
import {TrainingsModalComponent} from "./components/trainings-listing/trainings-modal/trainings-modal.component";
import {TrainingsService} from "./trainings.service";
import {
    TrainingsDeleteModalComponent
} from "./components/trainings-listing/trainings-delete-modal/trainings-delete-modal.component";
import {MatInputModule} from "@angular/material/input";
import {
    TrainingsEditModalComponent
} from "./components/trainings-listing/trainings-edit-modal/trainings-edit-modal.component";
import {TrainingsDetailsComponent} from "./components/details/trainings-details.component";


@NgModule({
    declarations: [
        TrainingsModalComponent,
        TrainingsListingComponent,
        TrainingsDeleteModalComponent,
        TrainingsEditModalComponent,
        TrainingsDetailsComponent,



    ],
    imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        NgxDatatableModule,
        MatIconModule,
        CommonModule,
        NgxDatatableModule,
        NgbModule,
        ReactiveFormsModule,
        Angular2PromiseButtonModule,
    ],
    exports: [
        TrainingsListingComponent
    ],
    providers: [
        TrainingsService
    ]
})
export class TrainingsModule {
}
