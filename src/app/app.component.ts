import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-ck-volunteer-log';

    ngOnInit() {
        console.log("Am I here?")
    }

}
