import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2PromiseButtonModule } from "angular2-promise-buttons";
import {MatIconModule} from "@angular/material/icon";
import {EducationListingComponent} from "./components/education-listing/education-listing.component";
import {EducationModalComponent} from "./components/education-listing/education-modal/education-modal.component";
import {EducationsService} from "./educations.service";
import {BrowserModule} from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {
    EducationDeleteModalComponent
} from "./components/education-listing/education-delete-modal/education-delete-modal.component";
import {
    EducationEditModalComponent
} from "./components/education-listing/education-edit-modal/education-edit-modal.component";
import {EducationDetailsComponent} from "./components/details/education-details.component";

@NgModule({
    declarations: [
        EducationModalComponent,
        EducationListingComponent,
        EducationDeleteModalComponent,
        EducationEditModalComponent,
        EducationDetailsComponent,


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
        EducationListingComponent
    ],
    providers: [
        EducationsService
    ]
})
export class EducationsModule {
}
