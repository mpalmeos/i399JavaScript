import { Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import {NewComponent} from "./new/new.component";
import {EditComponent} from "./edit/edit.component";

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'new', component: NewComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: '', redirectTo: 'search', pathMatch: 'full' }
];