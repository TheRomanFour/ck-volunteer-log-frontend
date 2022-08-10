import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import {ToastrService} from 'ngx-toastr'
import {EducationsService} from "../../../educations.service";
import {Education} from "../../../educations.model";

@Component({
    templateUrl: "./education-edit-modal.component.html",
    styleUrls: ['./education-edit-modal.component.scss']
})
export class EducationEditModalComponent implements OnInit {

    editForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl("",Validators.nullValidator),
        date_from: new UntypedFormControl("",Validators.nullValidator ),
        date_to: new UntypedFormControl("",Validators.nullValidator ),
        location: new UntypedFormControl("",Validators.nullValidator ),
        start_time: new UntypedFormControl("",Validators.nullValidator),
        maximum_participants: new UntypedFormControl("",Validators.nullValidator),
    });


    //TODO
    //Ovo je dosta loš pristup!!!
    //Jako puno class varijabli koje zauzimaju mjesto u memoriji a za par mjeseci kada budes gledao neces imati pojma zasto je toliko varijabli
    //dovoljna ti je jedna -> education: Education




    row : any = null ;
    promiseBtn: any;


    constructor(private aModal: NgbActiveModal,
                private educationService: EducationsService ,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        console.log(this.row._id)
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
        this.toastr.success("Volonter ažuriran",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno ažuriranje",'Greška!')
    }

    failedOib() {
        this.toastr.error(" Netočan OIB", 'Greška!');
    }

}
