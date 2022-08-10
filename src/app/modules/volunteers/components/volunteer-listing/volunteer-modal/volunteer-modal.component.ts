import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-modal.component.html"
})
export class VolunteerModalComponent implements OnInit {

    createForm: UntypedFormGroup = new UntypedFormGroup({
        firstname: new UntypedFormControl("", Validators.required),
        lastname: new UntypedFormControl("", Validators.required),
        oib: new UntypedFormControl("", Validators.required),
        street: new UntypedFormControl("", Validators.required),
        streetNumber: new UntypedFormControl("", Validators.required),
        postcode: new UntypedFormControl("", Validators.required),
        city: new UntypedFormControl("", Validators.required),
        date_of_birth: new UntypedFormControl("", Validators.required),
        place_of_birth: new UntypedFormControl("", Validators.required),
        email: new UntypedFormControl("", Validators.nullValidator),
        phone: new UntypedFormControl("", Validators.nullValidator),
        skills: new UntypedFormControl("", Validators.nullValidator),
    });

    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    close() {
        this.aModal.close({ success: false });
    }

    isOibValid(input: string) {
        const oib = input.toString();

        if (oib.match(/\d{11}/) === null) {
            return false;
        }

        let calculated = 10;

        for (const digit of oib.substring(0, 10)) {
            calculated += parseInt(digit);
            calculated %= 10;
            if (calculated === 0) {
                calculated = 10;
            }
            calculated *= 2;
            calculated %= 11;
        }
        let check = 11 - calculated;

        if (check === 10) {
            check = 0;
        }

        return check === parseInt(oib[10]);
    }

    save() {
        const data = this.createForm.value;
        if (!this.isOibValid(data.oib)) {
            this.failedOib();
            return;
        }

        data.address = {
            street: data.street,
            streetNumber: data.streetNumber,
            postcode: data.postcode,
            city: data.city
        };

        this.promiseBtn = (async () => {
            const result = await this.volunteerService.create(data);
            if (!result.success) {
                //ngx-toastr error message
                this.failedToastr();
                return;
            }
            //Show ngx-toastr success message
            this.savedToastr();
            this.aModal.close({ success: true });

        })();
    }

    savedToastr() {
        this.toastr.success("Volonter spremljen", 'Uspjeh!');
    }

    failedToastr() {
        this.toastr.error(" Neuspješno spremanje", 'Greška!');
    }

    failedOib() {
        this.toastr.error(" Netočan OIB", 'Greška!');
    }

}
