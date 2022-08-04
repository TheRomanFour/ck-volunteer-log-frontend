import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VolunteerListingComponent } from "./components/volunteer-listing/volunteer-listing.component";
import { VolunteerDetailsComponent } from "./components/details/volunteer-details.component";
import {
    VolunteerDetailsBasicInfoComponent
} from "./components/details/basic-info/volunteer-details-basic-info.component";

const volunteerRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "volunteers",
        component: VolunteerListingComponent,
    },
    {
        path: "volunteers/details/:id",
        component: VolunteerDetailsComponent,
        children: [
            {
                path: "",
                redirectTo: "info",
                pathMatch: "full"
            },
            {
                path: "info",
                component: VolunteerDetailsBasicInfoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(volunteerRoutes)],
    exports: [RouterModule]
})
export class VolunteersRouting {
}
