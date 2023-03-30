import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {InterventionsListingComponent} from "./components/interventions-listings/interventions-listing.component";

const interventionRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "interventions",
        component: InterventionsListingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(interventionRoutes)],
    exports: [RouterModule]
})
export class InterventionsRouting {
}
