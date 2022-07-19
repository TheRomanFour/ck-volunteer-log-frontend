import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VolunteersService} from "../../../volunteers.service";
import {ToastrService} from 'ngx-toastr'


@Component({
    selector: "volunteer-delete-modal",
    templateUrl: "./volunteer-delete-modal.component.html"

})

export class VolunteerDeleteModalComponent implements OnInit {



    volunteer_id: string = "";

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService,
                private toastr: ToastrService) {
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
