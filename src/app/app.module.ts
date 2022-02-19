import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuiceProviderFactory } from "../providers/JuiceFactory";
import { Juice } from "../providers/Juice";
import { HttpClientModule } from "@angular/common/http";
import { VolunteersModule } from "./modules/volunteers/volunteers.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatCardModule} from "@angular/material/card";
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ContentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        VolunteersModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        FormsModule,
        NgxDatatableModule,
        MatCardModule,


    ],
    providers: [
        Juice,
        { provide: APP_INITIALIZER, useFactory: JuiceProviderFactory, deps: [Juice], multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
