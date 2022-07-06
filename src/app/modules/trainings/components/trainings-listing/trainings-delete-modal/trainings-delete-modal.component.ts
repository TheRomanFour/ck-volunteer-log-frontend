import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TrainingsService} from "../../../trainings.service";


@Component({
    selector: "training-delete-modal",
    templateUrl: "./trainings-delete-modal.component.html"

})

export class TrainingsDeleteModalComponent implements OnInit {


    //treba passat id od volontera na koji smo kliknuli

    constructor(private aModal: NgbActiveModal,
                private trainingsService: TrainingsService) {
    }
    ngOnInit(): void {
    }

    promiseBtn: any;

    close() {
        this.aModal.close({ success: false });
    }
    delete(){ /*
        this.promiseBtn = (async () => {
            const data = this.volunteerService.get(id());
            const result = await this.volunteerService.delete(id);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
       */
        console.log("obrisan");
    }
}