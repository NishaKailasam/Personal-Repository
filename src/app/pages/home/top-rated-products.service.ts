import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})

export class TopRatedProductsService {
  private _baseUrl = environment.apiUrl + 'api/web/';
  private _getproducts = this._baseUrl + 'get/products';
  public viewCart = new Subject();
  public seeCart = new Subject();
  public searchProd = new Subject();
  public filterProd = new Subject();
  public removeCart = new Subject();
  public removeCheckout = new Subject();
 private _getProduct = this._baseUrl + 'product';
  private _filterProduct = this._baseUrl + 'product/item/filter/counts/get';
  private _searchProduct = this._baseUrl + 'product/search';
  constructor(
    private http: HttpClient
  ) { }

  getTopRatedProducts() {
    return this.http.get<any>(this._getproducts);
  }

  getCartData() {
    if (JSON.parse(localStorage.getItem('cartData')!) == null) {
      return [];
    }
    return JSON.parse(localStorage.getItem('cartData')!);
  }
  getCart(data: any) {
    this.viewCart.next(data);
  }
  getData(data:any){
    this.seeCart.next(data);
  }
  getRemove(productId?:any) {
    this.removeCart.next(productId);
  }
  getRemoveCheckout() {
    this.removeCheckout.next();
  }
  filterProduct(data: any) {
    return this.http.put<any>(this._filterProduct, data);
  }

  getSingleProduct(id:any){
    return this.http.get<any>(this._getProduct + '/' + id);
  }
  searchProduct(data:any){
    return this.http.put<any>(this._searchProduct,data);
  }
  getSearch(data:any){
    this.searchProd.next(data)
  }
  getFilter(data:any){
    this.filterProd.next(data)
  }


  //  getCateData() {

  //    return JSON.parse(localStorage.getItem('cateid')!);

  //  }
  //  getBrandData() {

  //   return JSON.parse(localStorage.getItem('branid')!);

  // }
}






