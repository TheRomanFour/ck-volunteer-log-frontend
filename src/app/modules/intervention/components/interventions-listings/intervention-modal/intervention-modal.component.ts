import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EducationsService} from "../../../../educations/educations.service";

@Component({
    selector: "intervention-modal-wizard",
    templateUrl: "./intervention-modal.component.html"
})
export class InterventionModalComponent implements OnInit {

    //TODO create validation
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
            const data = { type:'intervention', ...this.createForm.value };
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
