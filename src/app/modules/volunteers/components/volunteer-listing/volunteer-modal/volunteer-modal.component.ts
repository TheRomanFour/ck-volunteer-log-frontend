import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";
import {ToastrService} from 'ngx-toastr'

@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-modal.component.html"
})
export class VolunteerModalComponent implements OnInit {

    createForm: UntypedFormGroup = new UntypedFormGroup({
        firstname: new UntypedFormControl("", Validators.required),
        lastname: new UntypedFormControl("", Validators.required),
        email: new UntypedFormControl("", Validators.required),
        phone: new UntypedFormControl("", Validators.nullValidator)
    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }

    save() {
        this.promiseBtn = (async () => {
            const data = this.createForm.value;
            const result = await this.volunteerService.create(data);
            if (!result.success) {
                //ngx-toastr error message
               this.failedToastr()
                return;
            }

            //Show ngx-toastr success message
            this.savedToastr();
            this.aModal.close({ success: true });

        })()
    }
    savedToastr(){
        this.toastr.success("Volonter spremljen",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno spremanje",'Greška!')
    }

}
