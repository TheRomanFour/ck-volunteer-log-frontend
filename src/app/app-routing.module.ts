import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {VolunteerListingComponent} from "./modules/volunteers/components/volunteer-listing/volunteer-listing.component";

const routes: Routes = [
    {

        path: "",
        redirectTo: "volunteers",
        pathMatch: "full",

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
