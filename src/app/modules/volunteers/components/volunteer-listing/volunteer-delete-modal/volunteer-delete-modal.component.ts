import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VolunteersService} from "../../../volunteers.service";
import {id} from "@swimlane/ngx-datatable";


@Component({
    selector: "volunteer-delete-modal",
    templateUrl: "./volunteer-delete-modal.component.html"

})

export class VolunteerDeleteModalComponent implements OnInit {


    //treba passat id od volontera na koji smo kliknuli

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService) {
    }
    ngOnInit(): void {
    }

    promiseBtn: any;

    close() {
        this.aModal.close({ success: false });
    }
    delete(){/*
        this.promiseBtn = (async () => {
            const data = this.volunteerService.get(id());
            const result = await this.volunteerService.delete(__id);
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