import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {EducationsService} from "../../../educations.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: "education-modal-wizard",
    templateUrl: "./education-modal.component.html"
})
export class EducationModalComponent implements OnInit {

    //TODO create validation
    createForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl("",Validators.required),
        date_from: new UntypedFormControl("",Validators.nullValidator ),
        date_to: new UntypedFormControl("",Validators.nullValidator ),
        location: new UntypedFormControl("",Validators.nullValidator ),
        start_time: new UntypedFormControl("",Validators.nullValidator),
        maximum_participants: new UntypedFormControl("",Validators.nullValidator),
        description: new UntypedFormControl("",Validators.nullValidator),

    });

    promiseBtn: any;



    constructor(private aModal: NgbActiveModal,
                private educationsService: EducationsService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = { type:'education', ...this.createForm.value };
            const result = await this.educationsService.create(data);
            if (!result.success) {
                this.failedToastr();
                return;
            }

            //Show ngx-toastr success message
            this.savedToastr();
            this.aModal.close({ success: true });
        })()
    }

    savedToastr() {
        this.toastr.success("Edukacija spremljena ", 'Uspjeh!');
    }

    failedToastr() {
        this.toastr.error(" Neuspješno spremanje", 'Greška!');
    }



}
