import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {TrainingsService} from "../../../trainings.service";

@Component({
    selector: "training-modal-wizard",
    templateUrl: "./trainings-modal.component.html"
})
export class TrainingsModalComponent implements OnInit {

    createForm: FormGroup = new FormGroup({
        title: new FormControl("",Validators.nullValidator),
        date: new FormControl("",Validators.nullValidator ),
        hours: new FormControl("",Validators.nullValidator ),
        description: new FormControl("",Validators.nullValidator),

    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private trainingsService: TrainingsService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }
    save() {
        this.promiseBtn = (async () => {
            const data = this.createForm.value;
            const result = await this.trainingsService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                return;
            }

            //Show ngx-toastr success message
            this.aModal.close({ success: true });
        })()
    }

}
