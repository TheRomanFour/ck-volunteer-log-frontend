import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  rows = [
    { Ime: 'Ivan', prezime: 'Vrsalović', spol: 'M' , oib: 1235123},
    { Ime: 'Ana', prezime: 'Vrsalović', spol: 'Ž' , oib: 1235123},
    { Ime: 'Perica', prezime: 'Perić', spol: 'Ž', oib: 1235123},

  ];
  columns = [{ prop: 'Ime' }, { name: 'prezime' }, { name: 'spol' }, {name: 'oib'}];

  constructor() { }

  ngOnInit(): void {
  }

}
