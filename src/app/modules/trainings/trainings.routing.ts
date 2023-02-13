import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {TrainingsListingComponent} from "./components/trainings-listing/trainings-listing.component";
import {EducationDetailsComponent} from "../educations/components/details/education-details.component";
import {TrainingsDetailsComponent} from "./components/details/trainings-details.component";

const trainingRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "trainings",
        component: TrainingsListingComponent,
    },
    {
        path: "trainings/details/:id",
        component: TrainingsDetailsComponent,
        children : [
            {
                path : "",
                redirectTo: "info",
                pathMatch : "full"

            },]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(trainingRoutes)],
    exports: [RouterModule]
})
export class TrainingsRouting {
}
