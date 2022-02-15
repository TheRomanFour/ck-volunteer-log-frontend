import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuiceProviderFactory } from "../providers/JuiceFactory";
import { Juice } from "../providers/Juice";
import { HttpClientModule } from "@angular/common/http";
import { VolunteersModule } from "./modules/volunteers/volunteers.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        VolunteersModule
    ],
    providers: [
        Juice,
        { provide: APP_INITIALIZER, useFactory: JuiceProviderFactory, deps: [Juice], multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
