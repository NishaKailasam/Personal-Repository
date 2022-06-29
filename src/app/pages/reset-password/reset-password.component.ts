import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  changeNewForm!: FormGroup;
  resetFormSubmited = false;
  changepasswordSubmited = false;
  passwordSubmited = false;
  otpSubmited = false;
  resendcard = true
  otpForm!: FormGroup
  config = {
    allowNumbersOnly: false,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': ' 40px',
      'height': '40px',

    }
  };
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  previousUrl: any;
  curUrl: any;
  otp: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: Router,
    private router: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.resetForm = this.formBuilder.group({
      userNameOrEmail: [null, [Validators.required]],
    })
    this.changeNewForm = this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      confirmNewPassword: [null, [Validators.required]],
    })

    this.curUrl = sessionStorage.getItem('CurrentUrl')

    this.otp = localStorage.getItem('otp');
    setTimeout(() => {
    }, 500);
    this.previousUrl = this.router.snapshot.params['previousUrl'];
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  get f() {
    return this.resetForm.controls
  }
  get s() {
    return this.changeNewForm.controls
  }
  onSubmit() {
    this.resetFormSubmited = true;
    if (this.resetForm.invalid) {
      return;
    }
    this.authService.resetPassword(this.resetForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.resendcard = false
    this.otpSubmited = true
  }
  verifiedClick() {
    var validateOTPObj: any = {
      otp: this.otp,
      mobileNo: JSON.parse(localStorage.getItem('signUpUserDTO')!).mobileNo
    }
    this.authService.validateOTP(validateOTPObj).pipe(first()).subscribe(res => {
      this.getUserDetails();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
    );
    this.resendcard = false;
    this.otpSubmited = false;
    this.passwordSubmited = true;
  }
  getUserDetails() {
    this.authService.getUserDetails().pipe(first()).subscribe(res => {
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      this.toastr.success(res.data);
      if (this.previousUrl) {
        this.route.navigate([this.previousUrl]).then(() => {
          window.location.reload();
        });
      } else {
        this.route.navigate([this.curUrl]).then(() => {
          window.location.reload();
        });
      }

    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    });
  }
  onClick() {
    this.changepasswordSubmited = true;
    this.authService.passwordUpdate(this.changeNewForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.route.navigate(['/home'])
  }

}
