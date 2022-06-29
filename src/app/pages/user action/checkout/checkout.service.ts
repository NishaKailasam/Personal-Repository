import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  open(myModal: any, arg1: { size: string; }) {
    throw new Error('Method not implemented.');
  }

  private _baseUrl = environment.apiUrl + 'api/customer/';
  private _createOrder = this._baseUrl + 'order/create';
  private _singleOrder = this._baseUrl + 'order/get';
  private _orderHistory = this._baseUrl + 'order/my/orders';
  
  constructor(
    private http: HttpClient

  ) { }


  createOrder(data:any){
    return this.http.post<any>(this._createOrder,data);
  }
  singleOrder(id:any){
    return this.http.get<any>(this._singleOrder + '/' + id);
  }
orderHistory(status:any){
  return this.http.get<any>(this._orderHistory + '/' + status);
}
}
