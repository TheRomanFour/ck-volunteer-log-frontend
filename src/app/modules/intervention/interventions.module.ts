import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2PromiseButtonModule } from "angular2-promise-buttons";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {InterventionsRouting} from "./interventions.routing";
import {
    InterventionDeleteModalComponent
} from "./components/interventions-listings/intervention-delete-modal/intervention-delete-modal.component";
import {
    InterventionEditModalComponent
} from "./components/interventions-listings/intervention-edit-modal/intervention-edit-modal.component";
import {
    InterventionModalComponent
} from "./components/interventions-listings/intervention-modal/intervention-modal.component";
import {InterventionsListingComponent} from "./components/interventions-listings/interventions-listing.component";
import {EducationsService} from "../educations/educations.service";

@NgModule({
    declarations: [
        InterventionsListingComponent,
        InterventionDeleteModalComponent,
        InterventionEditModalComponent,
        InterventionModalComponent,




    ],
    imports: [
        InterventionsRouting,
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
        InterventionsListingComponent
    ],
    providers: [
        EducationsService
    ]
})
export class InterventionsModule {
}
