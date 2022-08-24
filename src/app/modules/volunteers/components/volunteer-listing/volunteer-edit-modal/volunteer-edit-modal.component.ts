import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { VolunteersService } from "../../../volunteers.service";
import {ToastrService} from 'ngx-toastr'

@Component({
    selector: "volunteer-modal-wizard",
    templateUrl: "./volunteer-edit-modal.component.html",
    styleUrls: ['./volunteer-edit-modal.component.scss']
})
export class VolunteerEditModalComponent implements OnInit {

    editForm: UntypedFormGroup = new UntypedFormGroup({
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

    row : any = null;
    promiseBtn: any;

    constructor(private aModal: NgbActiveModal,
                private volunteerService: VolunteersService,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.editForm.controls['firstname'].setValue(this.row.firstname);
        this.editForm.controls['lastname'].setValue(this.row.lastname);
        this.editForm.controls['oib'].setValue(this.row.attributes.oib);
        this.editForm.controls['date_of_birth'].setValue(this.row.attributes.date_of_birth);
        this.editForm.controls['street'].setValue(this.row.addresses[0].street);
        this.editForm.controls['streetNumber'].setValue(this.row.addresses[0].streetNumber);
        this.editForm.controls['city'].setValue(this.row.addresses[0].city);
        this.editForm.controls['postcode'].setValue(this.row.addresses[0].postcode);
        this.editForm.controls['place_of_birth'].setValue(this.row.attributes.place_of_birth);
        this.editForm.controls['email'].setValue(this.row.email);
        this.editForm.controls['phone'].setValue(this.row.phone);
        this.editForm.controls['skills'].setValue(this.row.attributes.skills)
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
        var check = 11 - calculated;

        if (check === 10) {
            check = 0;
        }

        return check === parseInt(oib[10]);
    }

    update() {
        const data = this.editForm.value;
        if (!this.isOibValid(data.oib)) {
            this.failedOib();
            return;
        }

        this.promiseBtn = (async () => {
            data.address = {
                ...this.row.addresses[0],
                street: data.street,
                streetNumber: data.streetNumber,
                city: data.city,
                postcode: data.postcode,
            };

            delete data.street;
            delete data.streetNumber;
            delete data.city;
            delete data.postcode;

            const result = await this.volunteerService.update(this.row._id, data);
            if (!result.success) {
                this.failedToastr()
                return;
            }
            this.savedToastr();
            this.aModal.close({ success: true });

        })()
    }
    savedToastr(){
        this.toastr.success("Volonter ažuriran",'Uspjeh!')
    }
    failedToastr(){
        this.toastr.error(" Neuspješno ažuriranje",'Greška!')
    }

    failedOib() {
        this.toastr.error(" Netočan OIB", 'Greška!');
    }

}
