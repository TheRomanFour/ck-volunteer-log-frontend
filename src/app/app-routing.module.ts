import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {VolunteerListingComponent} from "./modules/volunteers/components/volunteer-listing/volunteer-listing.component";
import {EducationListingComponent} from "./modules/volunteers/components/education-listing/education-listing.component";
import {TrainingsListingComponent} from "./modules/volunteers/components/trainings-listing/trainings-listing.component";

const routes: Routes = [
    { path: 'volunteers', component: VolunteerListingComponent },
    { path: 'educations', component: EducationListingComponent },
    { path: 'trainings', component: TrainingsListingComponent },


    { path: '',   redirectTo: 'volunteers', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
