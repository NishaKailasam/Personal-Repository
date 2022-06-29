import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllCategoryService {
  _baseUrl = environment.apiUrl + 'api/web/'
  private _categories = this._baseUrl + 'categories';

  constructor(private http: HttpClient) { }

  getcategories()
   {
    return this.http.get<any>(this._categories);
  }

  getcategoriesGetById(id : any)
  {
   return this.http.get<any>(this._categories + '/' + id);
 }



}
