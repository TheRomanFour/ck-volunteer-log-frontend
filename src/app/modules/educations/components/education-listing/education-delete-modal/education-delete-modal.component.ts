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
    // TODO : modal se ne zatvori nakon sta ga probisem ali se pobrise iz baze
    delete(){
        this.promiseBtn = (async () => {
            const result = await this.educationService.delete(this.education_id);
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