import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VolunteersService} from "../../../volunteers.service";


@Component({
    selector: "volunteer-delete-modal",
    templateUrl: "./volunteer-delete-modal.component.html"

})

export class VolunteerDeleteModalComponent implements OnInit {



    volunteer_id: string = "";

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService) {
    }
    ngOnInit(): void {
        console.log(this.volunteer_id);
    }

    promiseBtn: any;

    close() {
        this.aModal.close({ success: false });
    }
    delete_volunteer(volunteer_id:string){

        this.promiseBtn = (async () => {
            const result = await this.volunteerService.delete(volunteer_id);
            console.log("obrisan je kao");
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()


    }
}
