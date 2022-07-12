import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {EducationsService} from "../../../educations.service";

@Component({
    selector: "education-modal-wizard",
    templateUrl: "./education-modal.component.html"
})
export class EducationModalComponent implements OnInit {

    createForm: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl("",Validators.nullValidator),
        date: new UntypedFormControl("",Validators.nullValidator ),
        hours: new UntypedFormControl("",Validators.nullValidator ),
        description: new UntypedFormControl("",Validators.nullValidator),

    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private educationsService: EducationsService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = this.createForm.value;
            const result = await this.educationsService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
    }

}
