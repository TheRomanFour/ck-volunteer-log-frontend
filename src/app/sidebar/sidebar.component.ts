import { Router } from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private observer: BreakpointObserver,
    private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    if (window.location.pathname === '/') {
       await this.router.navigate(['volunteers']);
    }
  }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

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
