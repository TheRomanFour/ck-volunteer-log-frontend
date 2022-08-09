import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EducationsService} from "../../../educations.service";
import {ToastrService} from "ngx-toastr";


@Component({
    selector: "education-delete-modal",
    templateUrl: "./education-delete-modal.component.html",

})

export class EducationDeleteModalComponent implements OnInit {


    education_id: string = "";

    //treba passat id od volontera na koji smo kliknuli

    constructor(private aModal: NgbActiveModal,
                private educationService: EducationsService,
                private toastr: ToastrService) {
    }
    ngOnInit(): void {
    }

    promiseBtn: any;

    close() {
        this.aModal.close({ success: false });
    }

    delete(education_id: string){
        this.promiseBtn = (async () => {
            const result = await this.educationService.delete(education_id);
            if (!result.success) {
                this.failedToastr()
                return;
            }
            this.aModal.close({ success: true });
            this.savedToastr()
        })()

    }

    savedToastr(){
        this.toastr.success("Volonter  je izbrisan ",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno brisanje",'Greška!')
    }
}