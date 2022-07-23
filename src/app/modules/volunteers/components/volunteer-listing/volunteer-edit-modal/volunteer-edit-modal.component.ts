import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";
import {ToastrService} from 'ngx-toastr'

@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-edit-modal.component.html",
    styleUrls: ['./volunteer-edit-modal.component.scss']
})
export class VolunteerEditModalComponent implements OnInit {

    editForm: UntypedFormGroup = new UntypedFormGroup({
        firstname: new UntypedFormControl("", Validators.required),
        lastname: new UntypedFormControl("", Validators.required),
        oib: new UntypedFormControl("", Validators.required),
        email: new UntypedFormControl("", Validators.required),
        phone: new UntypedFormControl("", Validators.nullValidator)
    });

    volunteer_id: string = "";
    volunteer_firstname: string = "";
    volunteer_lastname: string = "";
    volunteer_oib : string = "";
    volunteer_email: string = "";
    volunteer_phone: string = "";


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



    update(volunteer_id:string) {
        this.promiseBtn = (async () => {
            const data = this.editForm.value;
            const result = await this.volunteerService.update(volunteer_id,data );
            if (!result.success) {
                //ngx-toastr error message
                this.failedToastr()
                return;
            }

            //Show ngx-toastr success message
            this.savedToastr();
            console.log("Update?")
            this.aModal.close({ success: true });

        })()
    }
    savedToastr(){
        this.toastr.success("Volonter ažuriran",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno ažuriranje",'Greška!')
    }



}
