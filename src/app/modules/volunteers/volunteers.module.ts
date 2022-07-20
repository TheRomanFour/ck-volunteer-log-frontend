import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersRouting } from "./volunteers.routing";
import { VolunteerListingComponent } from './components/volunteer-listing/volunteer-listing.component';
import { VolunteersService } from "./volunteers.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VolunteerModalComponent } from "./components/volunteer-listing/volunteer-modal/volunteer-modal.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Angular2PromiseButtonModule } from "angular2-promise-buttons";
import {MatIconModule} from "@angular/material/icon";
import {
    VolunteerDeleteModalComponent
} from "./components/volunteer-listing/volunteer-delete-modal/volunteer-delete-modal.component";

import {ToastrModule} from 'ngx-toastr'
import {
    VolunteerEditModalComponent
} from "./components/volunteer-listing/volunteer-edit-modal/volunteer-edit-modal.component";
import {
    VolunteerInfoModalComponent
} from "./components/volunteer-listing/volunteer-info-modal/volunteer-info-modal.component";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [
        VolunteerListingComponent,
        VolunteerModalComponent,
        VolunteerDeleteModalComponent,
        VolunteerEditModalComponent,
        VolunteerInfoModalComponent,


    ],
    imports: [
        MatIconModule,
        CommonModule,
        VolunteersRouting,
        NgxDatatableModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        Angular2PromiseButtonModule,
        MatInputModule
    ],
    exports: [
        VolunteerListingComponent
    ],
    providers: [
        VolunteersService
    ]
})
export class VolunteersModule {
}
