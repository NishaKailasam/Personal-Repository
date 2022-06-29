import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
private _baseUrl = environment.apiUrl + 'api/customer/';
private _createFav = this._baseUrl + 'favorite-product/create';
private _getFav = this._baseUrl + 'favorite-product/get';
private _deleteFav = this._baseUrl + 'favorite-product/delete';
public viewWishList = new Subject();
// favProductArr: any={};
  constructor(
private http:HttpClient
  ) { }
  createFav(data:any){
    return this.http.post<any>(this._createFav,data);
  }
  getFav() {
    return this.http.get<any>(this._getFav);
  }
  deleteFav(id:any){
    return this.http.delete<any>(this._deleteFav + '/' + id);
  }
  // getFavorite(){
  //   this.getFav().pipe(first()).subscribe(res=>{
  //     this.favProductArr=res.data;
  //   })
  // }

  showFav() {
    this.viewWishList.next();
  }
}
