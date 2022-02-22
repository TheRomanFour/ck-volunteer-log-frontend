import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";

@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-modal.component.html"
})
export class VolunteerModalComponent implements OnInit {

    createForm: FormGroup = new FormGroup({
        firstname: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.nullValidator)
    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService) {
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
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
    }

}
