import { Http, Response, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";

export class Contact {
    _id: string;

    constructor(public name : string, public phone : string) {
    };
}

export class ContactListItem {
    checked: boolean = false;

    constructor(public contact) {
    };
}

@Injectable()
export class ContactService {
    constructor(private http: Http) {}

    getContacts(searchParams?: URLSearchParams): Promise<Contact[]> {
        return this.http
            .get('api/contacts', {search: searchParams})
            .toPromise()
            .then((response: Response) => response.json());
    }

    getContact(id: string): Promise<Contact> {
        return this.http
            .get('api/contacts/' + id)
            .toPromise()
            .then((response: Response) => response.json());
    }

    saveContact(contact: Contact): Promise<void> {
        return this.http
            .post('api/contacts', contact)
            .toPromise()
            .then(() => <void>null);
    }

    updateContact(contact: Contact): Promise<void> {
        return this.http
            .put('api/contacts/' + contact._id, contact)
            .toPromise()
            .then(() => <void>null);
    }

    deleteContact(id: string): Promise<void> {
        return this.http
            .delete('api/contacts/' + id)
            .toPromise()
            .then(() => <void>null);
    }

    deleteContacts(ids: string[]): Promise<void> {
        return this.http
            .post('api/contacts/delete', ids)
            .toPromise()
            .then(() => <void>null);
    }

}