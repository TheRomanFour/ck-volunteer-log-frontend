import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VolunteerListingComponent } from "./components/volunteer-listing/volunteer-listing.component";

const volunteerRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "volunteers",
        component: VolunteerListingComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(volunteerRoutes)],
    exports: [RouterModule]
})
export class VolunteersRouting {
}
