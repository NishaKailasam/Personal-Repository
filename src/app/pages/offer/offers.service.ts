import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private _baseUrl = environment.apiUrl + 'api/web/';

  private _getOffer = this._baseUrl + 'get/active/offers';

  constructor(
    private http: HttpClient

  ) { }

  getOffer(){
    return this.http.get<any>(this._getOffer);
  }
}
