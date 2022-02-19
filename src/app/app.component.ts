import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-ck-volunteer-log';

    rows = [
        { Ime: 'Ivan', prezime: 'Vrsalović', spol: 'M' , oib: 1235123},
        { Ime: 'Ana', prezime: 'Vrsalović', spol: 'Ž' , oib: 1235123},
        { Ime: 'Perica', prezime: 'Perić', spol: 'Ž', oib: 1235123},

    ];
    columns = [{ prop: 'Ime' }, { name: 'prezime' }, { name: 'spol' }, {name: 'oib'}];


    ngOnInit() {
        console.log("Am I here?")
    }

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    constructor(private observer: BreakpointObserver) {

    }
    ngAfterViewInit() {
        this.observer.observe(['(max-width: 900px)']).subscribe((res)=> {
            if(res.matches){
                this.sidenav.mode = 'over';
                this.sidenav.close();
            }
            else {
                this.sidenav.mode = 'side';
                this.sidenav.open();

            }
        });
    }
}
