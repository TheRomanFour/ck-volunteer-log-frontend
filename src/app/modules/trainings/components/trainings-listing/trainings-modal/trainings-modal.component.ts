import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {TrainingsService} from "../../../trainings.service";

@Component({
    selector: "training-modal-wizard",
    templateUrl: "./trainings-modal.component.html"
})
export class TrainingsModalComponent implements OnInit {

    createForm: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl("",Validators.nullValidator),
        date: new UntypedFormControl("",Validators.nullValidator ),
        hours: new UntypedFormControl("",Validators.nullValidator ),
        description: new UntypedFormControl("",Validators.nullValidator),

    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private trainingsService: TrainingsService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = this.createForm.value;
            const result = await this.trainingsService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
    }

}
