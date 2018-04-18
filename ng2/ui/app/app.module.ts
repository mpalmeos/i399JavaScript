import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { ContactService } from "./contact.service";
import { RouterModule } from "@angular/router";
import { routes } from "./app-routing.module";
import { SearchComponent } from "./search/search.component";
import { NewComponent } from "./new/new.component";
import { EditComponent } from "./edit/edit.component";

@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(routes, { useHash: true }) ],
    declarations: [ AppComponent, SearchComponent, NewComponent, EditComponent ],
    providers: [ ContactService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }