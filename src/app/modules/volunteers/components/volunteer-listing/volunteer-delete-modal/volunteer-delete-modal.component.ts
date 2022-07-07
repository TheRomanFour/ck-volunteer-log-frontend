import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VolunteersService} from "../../../volunteers.service";


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
    delete(/*_id:string */){
        /*
        this.promiseBtn = (async () => {
            const result = await this.volunteerService.delete(_id);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()

        console.log("obrisan");
*/
    }
}