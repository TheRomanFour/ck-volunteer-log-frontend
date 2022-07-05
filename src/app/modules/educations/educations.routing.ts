import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EducationListingComponent } from "./components/education-listing/education-listing.component";

const educationRoutes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    {
        path: "educations",
        component: EducationListingComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(educationRoutes)],
    exports: [RouterModule]
})
export class EducationsRouting {
}
