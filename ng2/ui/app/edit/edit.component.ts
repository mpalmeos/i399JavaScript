import { Component, OnInit } from '@angular/core';
import { Contact, ContactService } from '../contact.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'edit',
    templateUrl: 'app/edit/edit.html',
})
export class EditComponent implements OnInit {
    name: string;
    phone: string;
    contact: Contact;

    constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) {}

    private addContact(): void {
        this.contact.name = this.name;
        this.contact.phone = this.phone;
        this.contactService.updateContact(this.contact).then(contact => this.router.navigateByUrl('search'));
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.contactService.getContact(id).then(contact => {
            this.contact = contact;
            this.name = contact.name;
            this.phone = contact.phone;
        });
    }

}