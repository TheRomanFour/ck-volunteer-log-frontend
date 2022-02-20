import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-volonteri',
  templateUrl: './volonteri.component.html',
  styleUrls: ['./volonteri.component.css']
})
export class VolonteriComponent implements OnInit {
  rows = [
    {ime: 'Ivan', prezime: 'Vrsalović',  oib: '48732243', broj: '091248732243'},
    {ime: 'Ana', prezime: 'Vrsalović',  oib: '4235235230', broj: '09548732243'},
    {ime: 'Perica', prezime: 'Perić',  oib: '4235235230', broj: '732243'},
    {ime: 'Ivan', prezime: 'Vrsalović', oib: '4235235230', broj: '48732243'},

  ];
  columns = [{prop: 'ime'}, {prop: 'prezime'}, {name: 'OIB'}, {prop: 'broj'}];

  formValue !: FormGroup;

  constructor(private formbuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Ime: [''],
      lastName: [''],
      OIB: [''],
      broj: [''],

    })
  }
}