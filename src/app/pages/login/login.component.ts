import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from '../pages/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
 public loginFormSubmitted = false;

  id: any;
  previousUrl: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr : ToastrService,
    private spinner :NgxSpinnerService,
    private profileService:ProfileService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.previousUrl = navigation?.extras.state ? navigation.extras.state.isLogin : false;
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      userName: [null, Validators.required],
      password: [null, Validators.required],
    });

this.spinner.hide();
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.createLogin(this.loginForm.value).pipe(first()).subscribe(res => {

      this.toastr.success(res.data.message);
      localStorage.setItem('token', res.data.jwt);
      // this.authService.getName(this.loginForm.value);
      if (res.data.jwt) {
        this.loginForm.reset({});
        this.loginFormSubmitted = false;
        this.getUserDetails();


        if (this.previousUrl) {
          this.router.navigate(['/checkout']);
          this.getUserImage();

        } else {
          this.router.navigate(['/home']);
          this.getUserImage();
        }
      }
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.message);
    })

  }
  getUserDetails() {
    this.authService.getUserDetails().pipe(first()).subscribe(res => {
      // this.toastr.success(res.message);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      // if (res.data.loginObj.roleObj.roleName == 'CUSTOMER') {
      //   if (this.id) {
      //     this.router.navigate([this.id]).then(() => {
      //       window.location.reload();
      //     });
      //   } else {
      //     this.router.navigate(['/home']).then(() => {
      //       window.location.reload();
      //     });
      //   }
      // } else {
      //   if (this.id) {
      //     this.router.navigate([this.id]).then(() => {
      //       window.location.reload();
      //     });
      //   } else {
      //     this.router.navigate(['/home']).then(() => {
      //       window.location.reload();
      //     });
      //   }
      // }

      // this.spinner.show();


    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.message);
    })
  }
  getUserImage(){
    this.profileService.getUserProfile().pipe(first()).subscribe(res =>{
      // this.toastr.success(res.message);

      localStorage.setItem('login',JSON.stringify(res.data));
    })
      }

  public showPassword: boolean;
 name = 'Angular';
}


