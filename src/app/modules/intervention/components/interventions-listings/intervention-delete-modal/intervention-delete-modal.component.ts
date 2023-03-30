import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {EducationsService} from "../../../../educations/educations.service";


@Component({
    selector: "intervention-delete-modal",
    templateUrl: "./intervention-delete-modal.component.html",

})

export class InterventionDeleteModalComponent implements OnInit {


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
        this.toastr.success("Edukacija obrisana ",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno brisanje",'Greška!')
    }
}
