import { Component } from '@angular/core';
import { Contact, ContactService } from '../contact.service';
import {Router} from "@angular/router";

@Component({
    selector: 'new',
    templateUrl: 'app/new/new.html',
})
export class NewComponent {
    name: string;
    phone: string;

    constructor(private contactService: ContactService, private router: Router) {}

    private addContact(): void {
        this.contactService.saveContact(new Contact(this.name, this.phone)).then(contact => this.router.navigateByUrl('search'));
    }
}