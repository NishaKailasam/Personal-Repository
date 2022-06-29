import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private _baseUrl = environment.apiUrl +"api/"; 
  private _getBrandList = this._baseUrl + 'web/brands';
  
  constructor(private http: HttpClient) { }

  getBrandList(){
    return this.http.get<any>(this._getBrandList);
  }
  getSingleBrand(id:any){
    return this.http.get<any>(this._getBrandList + '/' + id);
  }
}
