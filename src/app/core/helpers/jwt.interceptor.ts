import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/pages/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    const headersConfig:any = {}
    const token = localStorage.getItem("token")
     
 
  if (token) {

    headersConfig['Authorization'] = `BslogiKey ${token}`
   
  }
  const _req = request.clone({ setHeaders: headersConfig });
  return next.handle(_req);
  }
}
