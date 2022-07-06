import { Component, OnInit } from '@angular/core';
import {IFetchOptions} from "../../../../../interfaces/IFetchOptions";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrainingsService} from "../../trainings.service";
import {Training} from "../../training.model";
import {TrainingsModalComponent} from "./trainings-modal/trainings-modal.component";
import {TrainingsDeleteModalComponent} from "./trainings-delete-modal/trainings-delete-modal.component";

@Component({
  selector: 'app-training-listing',
  templateUrl: './trainings-listing.component.html',
  styleUrls: ['./trainings-listing.component.css']
})
export class TrainingsListingComponent implements OnInit {

  page: number = 0;
  pageSize: number = 10;
  options: IFetchOptions = {
    filter: [],
    sort: { prop: "email", dir: "asc" }
  };

  rows: Training[] = [];

  constructor(private educations: TrainingsService, private modal: NgbModal) { }


  async ngOnInit(): Promise<void> {
    await this.fetchTrainings();
  }

  private async fetchTrainings() {
    const result = await this.educations.fetch(this.page, this.pageSize, this.options);
    if (!result.success)
      return;

    // @ts-ignore
    this.rows = result.payload.items;
    console.log(result);


  }
  onSelect(event: Event & any) {
    if (event.type !== "click")
      return;

    console.log(event.row);

    //modal.componentInstance.id = event.row._id;
  }

  openTrainingWizard() {
    const modal = this.modal.open(TrainingsModalComponent);
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchTrainings();
    });
  }

  openTrainingDelete() {
    const modal = this.modal.open(TrainingsDeleteModalComponent);
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchTrainings();
    });
  }
}
