import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";


@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-info-modal.component.html",
})
export class VolunteerInfoModalComponent implements OnInit {



    volunteer_id: string = "";
    volunteer_firstname: string = "";
    volunteer_lastname: string = "";
    volunteer_email: string = "";
    volunteer_phone: string = "";


    promiseBtn: any;


    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }





}
