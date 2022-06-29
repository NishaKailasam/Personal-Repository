import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _baseUrl= environment.apiUrl + 'auth/';
  private _createLogin=this._baseUrl + 'login';
  private _createSignUp=this._baseUrl + 'signup';
  private _validateOtp=this._baseUrl + 'validate/otp';
  private _getUserDetails=this._baseUrl + 'user-details';
  private _changePassword=this._baseUrl + 'change/password';
  private _resetPassword=this._baseUrl + 'send/password';
  private _passwordUpdate=this._baseUrl + 'password/update'

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  createLogin(data:any){
    return this.http.post<any>(this._createLogin,data);
  }
  createSignUp(data:any){
    return this.http.post<any>(this._createSignUp,data);
  }
  validateOTP(data:any){
    return this.http.post<any>(this._validateOtp,data);
  }
  getUserDetails() {
    return this.http.get<any>(this._getUserDetails);
  }
  public getToken() {
    return localStorage.getItem('token');
}
loggedIn() {
  return localStorage.getItem('token');
}
logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('signUpUserDTO');
  localStorage.removeItem('token');
  localStorage.removeItem('otp');
  localStorage.removeItem('cartData');
  localStorage.removeItem('login');
  // this.registeredNameSub.next('');
  this.router.navigate(['/']);

}
public currentUser(){
  return JSON.parse(localStorage.getItem('currentUser')!);
}
public getUserName() {
  if (JSON.parse(localStorage.getItem('currentUser')!)) {
      return (JSON.parse(localStorage.getItem('currentUser')!).loginObj?.fullName);
  }
}
public getUserProfile() {
  if (JSON.parse(localStorage.getItem('login')!)) {
      return (JSON.parse(localStorage.getItem('login')!).fileUrl);
  }
}
changePassword(data: any){
  return this.http.put<any>(this._changePassword,data)
}
resetPassword(data:any){
  return this.http.put<any>(this._resetPassword,data)
}
passwordUpdate(data:any){
  return this.http.put<any>(this._passwordUpdate,data)
}

}
