import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {VolunteerListingComponent} from "./modules/volunteers/components/volunteer-listing/volunteer-listing.component";
import {EducationListingComponent} from "./modules/educations/components/education-listing/education-listing.component";
import {TrainingsListingComponent} from "./modules/trainings/components/trainings-listing/trainings-listing.component";


const routes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        redirectTo: 'volunteers'
    },
    { path: 'volunteers', component: VolunteerListingComponent },
    { path: 'educations', component: EducationListingComponent },
    { path: 'trainings', component: TrainingsListingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
