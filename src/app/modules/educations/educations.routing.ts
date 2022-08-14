import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EducationListingComponent } from "./components/education-listing/education-listing.component";
import {EducationDetailsComponent} from "./components/details/education-details.component";

const educationRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "educations",
        component: EducationListingComponent,
    },

    {
        path: "educations/details/:id",
        component: EducationDetailsComponent,
        children : [
            {
                path : "",
                redirectTo: "info",
                pathMatch : "full"

            },]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(educationRoutes)],
    exports: [RouterModule]
})
export class EducationsRouting {
}
