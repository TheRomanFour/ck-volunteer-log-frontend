import { Component, OnInit } from '@angular/core';
import {IFetchOptions} from "../../../../../interfaces/IFetchOptions";
import {VolunteersService} from "../../../volunteers/volunteers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Education} from "../../educations.model";
import {EducationModalComponent} from "./education-modal/education-modal.component";
import {EducationDeleteModalComponent} from "./education-delete-modal/education-delete-modal.component";
@Component({
  selector: 'app-education-listing',
  templateUrl: './education-listing.component.html',
  styleUrls: ['./education-listing.component.css']
})
export class EducationListingComponent implements OnInit {

  page: number = 0;
  pageSize: number = 10;
  options: IFetchOptions = {
    filter: [],
    sort: { prop: "email", dir: "asc" }
  };

  rows: Education[] = [];

  constructor(private educations: VolunteersService, private modal: NgbModal) { }


  async ngOnInit(): Promise<void> {
    await this.fetchEducations();
  }

  private async fetchEducations() {
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
  openEducationWizard() {
    const modal = this.modal.open(EducationModalComponent);
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchEducations();
    });
  }

  openEducationDelete() {
    const modal = this.modal.open(EducationDeleteModalComponent);
    modal.result.then(async res => {
      if (!res.success)
        return;

      await this.fetchEducations();
    });
  }
  Filter() {
//        const lowerValue = filterValue.toLowerCase();
//        this.filteredList = this.items.filter(item => item.name.toLowerCase().indexOf(lowerValue) !== -1 || !lowerValue);
  }
}
