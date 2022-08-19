import { Component } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {EducationsService} from "../../educations.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    EducationDeleteModalComponent
} from "../education-listing/education-delete-modal/education-delete-modal.component";
import {EducationEditModalComponent} from "../education-listing/education-edit-modal/education-edit-modal.component";

@Component({
    templateUrl: "./education-details.component.html",
    styleUrls: ['./education-details.component.scss']

})
export class EducationDetailsComponent {
    constructor(private aRouter: ActivatedRoute,
                private modal: NgbModal,
                private router: Router,
                private educationService: EducationsService) {
    }

    education: any;


    async ngOnInit(): Promise<void> {
        const id = this.aRouter.snapshot.params['id']
        await this.fetchEducation(id);
    }

    async fetchEducation(_id: string) {
        const result = await this.educationService.get(_id);
        this.education = result.payload;
    }

    openVolunteerDelete(_id: string) {
        const modal = this.modal.open(EducationDeleteModalComponent);
        //Send data to modal -> Modal needs to have class variable with same name
        modal.componentInstance.education_id = _id;
        modal.result.then(async res => {
            if (!res.success) {
                return;
            }
            return this.router.navigate(['educations/']);
        });
    }

    openVolunteerEdit() {
        const modal = this.modal.open(EducationEditModalComponent)
        modal.componentInstance.row = this.education;
        modal.result.then(async res => {
            if (!res.success) {
                return;
            }
            await this.ngOnInit();

        });

    }
}
