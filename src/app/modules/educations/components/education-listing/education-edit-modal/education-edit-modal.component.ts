import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {ToastrService} from 'ngx-toastr'
import {EducationsService} from "../../../educations.service";

@Component({
    templateUrl: "./education-edit-modal.component.html",
    styleUrls: ['./education-edit-modal.component.scss']
})
export class EducationEditModalComponent implements OnInit {

    //TODO Add validation
    editForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl("",Validators.nullValidator),
        date_from: new UntypedFormControl("",Validators.nullValidator ),
        date_to: new UntypedFormControl("",Validators.nullValidator ),
        location: new UntypedFormControl("",Validators.nullValidator ),
        start_time: new UntypedFormControl("",Validators.nullValidator),
        maximum_participants: new UntypedFormControl("",Validators.nullValidator),
        description : new  UntypedFormControl("", Validators.nullValidator)
    });


    row : any = null ;
    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private educationService: EducationsService ,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.editForm.controls['name'].setValue(this.row.name);
        this.editForm.controls['date_from'].setValue(this.row.date_from);
        this.editForm.controls['date_to'].setValue(this.row.date_to);
        this.editForm.controls['location'].setValue(this.row.location);
        this.editForm.controls['start_time'].setValue(this.row.start_time);

        this.editForm.controls['maximum_participants'].setValue(this.row.maximum_participants);
        this.editForm.controls['description'].setValue(this.row.description);



    }

    close() {
        this.aModal.close({ success: false });
    }


    update() {
        const data = this.editForm.value;
        this.promiseBtn = (async () => {
            const result = await this.educationService.update(this.row._id,data );
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
        this.toastr.success("Edukacija ažurirana",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno ažuriranje",'Greška!')
    }

    failedOib() {
        this.toastr.error(" Netočan OIB", 'Greška!');
    }

}
