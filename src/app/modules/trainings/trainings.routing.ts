import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {TrainingsListingComponent} from "./components/trainings-listing/trainings-listing.component";

const trainingRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "educations",
        component: TrainingsListingComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(trainingRoutes)],
    exports: [RouterModule]
})
export class TrainingsRouting {
}
