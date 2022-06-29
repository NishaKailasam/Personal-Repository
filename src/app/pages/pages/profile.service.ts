import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  deleteBrand(myModal: (myModal: any, arg1: { size: string; }) => void, arg1: { size: string; }) {
    throw new Error('Method not implemented.');
  }
  open(myModal: any, arg1: { size: string; }) {
    throw new Error('Method not implemented.');
  }
  
  // Address
  private _baseUrl = environment.apiUrl + 'api/customer/';

  private _createAddress = this._baseUrl + 'delivery-address/create';

  private _getAddress = this._baseUrl + 'delivery-address/get';

  private _updateAddress = this._baseUrl + 'delivery-address/update';

  private _deleteAddress = this._baseUrl + 'delivery-address/delete';

  // profile
  private _getUserProfile = this._baseUrl + 'user/profile/get';

  private _updateUserProfile = this._baseUrl + 'user/profile/update';

  //contact-number
  private _createMobileNumber =this._baseUrl + 'profile/mobile/create';

  private _updateMobileNumber = this._baseUrl + 'profile/mobile/update';

  private _getContactNumber = this._baseUrl + 'profile/mobile/get';

  private _deleteNumber = this._baseUrl + 'profile/mobile/delete';


  // location
  private _getState = environment.apiUrl + 'api/country/state/get';

  private _getCity = environment.apiUrl + 'api/city/get';

  private _getCountry = environment.apiUrl + 'api/country/get';

  // change-password
  private _changePassword = environment.apiUrl + 'auth/change/password';


  constructor(
    private http: HttpClient
  ) { }

  // Address
  createAddress(data: any) {
    return this.http.post<any>(this._createAddress, data);
  }
  getAddress() {
    return this.http.get<any>(this._getAddress);
  }
  getSingleCity(id:any){
    return this.http.get<any>(this._getCity + '/'+ id);
  }
  editAddress(id:any){
    return this.http.get<any>(this._getAddress + '/' +id);
  }
  updateAddress(data: any) {
    return this.http.put<any>(this._updateAddress, data);
  }
  deleteAddress(id:any){
    return this.http.delete<any>(this._deleteAddress + '/' + id);
  }

  // location
  getCountry() {
    return this.http.get<any>(this._getCountry);
  }
  getState(id: any) {
    return this.http.get<any>(this._getState + '/' + id);
  }
  getCity() {
    return this.http.get<any>(this._getCity);
  }

  // profile
  getUserProfile() {
    return this.http.get<any>(this._getUserProfile);
  }
  updateUserProfile(data: any) {
    return this.http.put<any>(this._updateUserProfile, data);
  }

  // contact-number
  getContactNumber(){
    return this.http.get<any>(this._getContactNumber);
  }
  getSingleNumber(id:any){
    return this.http.get<any>(this._getContactNumber + '/' + id);
  }
  createMobileNumber(data:any){
    return this.http.post<any>(this._createMobileNumber, data);
  }
  updateMobileNumber(data:any){
    return this.http.put<any>(this._updateMobileNumber, data);
  }
  deleteNumber(id:any){
    return this.http.delete<any>(this._deleteNumber + '/' + id);
  }

  // change-password
  changePassword(data: any) {
    return this.http.put<any>(this._changePassword, data);
  }

}

