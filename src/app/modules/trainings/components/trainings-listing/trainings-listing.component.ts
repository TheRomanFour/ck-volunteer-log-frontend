import { Component, OnInit } from '@angular/core';
import {IFetchOptions} from "../../../../../interfaces/IFetchOptions";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrainingsService} from "../../trainings.service";
import {Training} from "../../training.model";
import {TrainingsModalComponent} from "./trainings-modal/trainings-modal.component";
import {TrainingsDeleteModalComponent} from "./trainings-delete-modal/trainings-delete-modal.component";
import {EducationsService} from "../../../educations/educations.service";
import {Education} from "../../../educations/educations.model";
import {
  EducationEditModalComponent
} from "../../../educations/components/education-listing/education-edit-modal/education-edit-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-training-listing',
  templateUrl: './trainings-listing.component.html',
  styleUrls: ['./trainings-listing.component.css']
})
export class TrainingsListingComponent implements OnInit {

  page: number = 0;
  pageSize: number = 10;
  options: IFetchOptions = {
    filter: [{
      property: 'type',
      fullText: false,
      language: false,
      term: 'training'
    }],
    sort: { prop: "email", dir: "asc" }
  };

  rows: Training[] = [];

  constructor(private trainings: EducationsService,
              private modal: NgbModal,
              private router: Router) { }


  async ngOnInit(): Promise<void> {
    await this.fetchTrainings();
  }

  async fetchTrainings() {
    const result = await this.trainings.fetch(this.page, this.pageSize, this.options);
    if (!result.success)
      return;

    // @ts-ignore
    this.rows = result.payload.items;


  }
  onSelect(event: any) {
    if (event.type !== "click")
      return;

    return this.router.navigate([`trainings/details/${event.row._id}`]);
  }

  openTrainingWizard() {
    const modal = this.modal.open(TrainingsModalComponent);
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchTrainings();
    });
  }

  openTrainingDelete(row:Education) {
    const modal = this.modal.open(TrainingsDeleteModalComponent);
    modal.componentInstance.education_id = row._id;
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchTrainings();
    });
  }
  openTrainingEdit(row: Education) {
    const modal = this.modal.open(EducationEditModalComponent);


    modal.componentInstance.row = row;

    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchTrainings();
    });
  }
  Filter() {
//        const lowerValue = filterValue.toLowerCase();
//        this.filteredList = this.items.filter(item => item.name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
  }
}
