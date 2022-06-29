import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _baseurl = environment.apiUrl + 'api/customer/contactus/'
  private _createcontact = this._baseurl + 'create'

  constructor(private http: HttpClient) { 
   }
  createContact(data:any) {
    return this.http.post<any>(this._createcontact,data);
  }
}
