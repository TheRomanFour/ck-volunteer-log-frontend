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

@NgModule({
    declarations: [
        VolunteerListingComponent,
        VolunteerModalComponent
    ],
    imports: [
        CommonModule,
        VolunteersRouting,
        NgxDatatableModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        Angular2PromiseButtonModule
    ],
    exports: [
        VolunteerListingComponent
    ],
    providers: [
        VolunteersService
    ],
    entryComponents: [
        VolunteerModalComponent
    ]
})
export class VolunteersModule {
}
