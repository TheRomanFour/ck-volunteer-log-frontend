import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {TrainingsService} from "../../../trainings.service";
import {EducationsService} from "../../../../educations/educations.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: "training-modal-wizard",
    templateUrl: "./trainings-modal.component.html"
})
export class TrainingsModalComponent implements OnInit {

    createForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl("",Validators.required),
        date_from: new UntypedFormControl("",Validators.required ),
        date_to: new UntypedFormControl("",Validators.required ),
        location: new UntypedFormControl("",Validators.nullValidator ),
        start_time: new UntypedFormControl("",Validators.nullValidator),
        maximum_participants: new UntypedFormControl("",Validators.nullValidator),
        description: new UntypedFormControl("",Validators.nullValidator),

    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private trainingsService: EducationsService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = {type : 'training', ...this.createForm.value};
            const result = await this.trainingsService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                this.failedToastr()
                return;
            }

            //Show ngx-toastr success message
            this.savedToastr()
            this.aModal.close({ success: true });
        })()
    }

    savedToastr() {
        this.toastr.success("Vježba spremljena ", 'Uspjeh!');
    }

    failedToastr() {
        this.toastr.error(" Neuspješno spremanje", 'Greška!');
    }

}
