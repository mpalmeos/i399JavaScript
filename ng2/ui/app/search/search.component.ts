import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ContactListItem, ContactService} from '../contact.service';

@Component({
    selector: 'list',
    templateUrl: 'app/search/search.html',
    styleUrls: ['app/search/search.css'],
})
export class SearchComponent implements OnInit {

    contactListItems: ContactListItem[] = [];

    public searchString: string;

    constructor(private contactService: ContactService) {}

    private getContacts(): void {
        const searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set('q', this.searchString);

        this.contactService.getContacts(searchParams).then(contacts => {
            this.contactListItems = contacts.map(contact => {
                return new ContactListItem(contact);
            });
        });
    }

    search (newValue) {
        this.searchString = newValue;
        this.getContacts();
    }

    deleteSelected (): void {
        const filtered: ContactListItem[] = this.contactListItems.filter(item => item.checked === true);
        this.contactService.deleteContacts(filtered.map(item => item.contact._id)).then(() => this.getContacts());
    }

    deleteContact(contactId : string): void {
        this.contactService.deleteContact(contactId)
            .then(() => this.getContacts());
    }

    ngOnInit(): void {
        this.getContacts();
    }
}