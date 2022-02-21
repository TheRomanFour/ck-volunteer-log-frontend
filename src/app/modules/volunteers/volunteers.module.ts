import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteersRouting } from "./volunteers.routing";
import { VolunteerListingComponent } from './components/volunteer-listing/volunteer-listing.component';
import { VolunteersService } from "./volunteers.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
    declarations: [
        VolunteerListingComponent,

    ],
    imports: [
        CommonModule,
        VolunteersRouting,
        NgxDatatableModule
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
