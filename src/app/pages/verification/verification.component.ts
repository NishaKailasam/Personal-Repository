import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  otpForm: any = FormGroup;
  otp: any;
  showOtpComponent = true;
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

  constructor(
     private authservice: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.curUrl = sessionStorage.getItem('CurrentUrl')

    this.otp = localStorage.getItem('otp');
    setTimeout(() => {
      this.onOtpChange();
    }, 500);
    this.previousUrl = this.route.snapshot.params['previousUrl'];
  }

  onOtpChange() {
    this.ngOtpInput.setValue(this.otp);
 
  }

  validateOTP() {
 
    var validateOTPObj:any = {
      otp: this.otp,
      mobileNo: JSON.parse(localStorage.getItem('signUpUserDTO')!).mobileNo
    }
    this.authservice.validateOTP(validateOTPObj).pipe(first()).subscribe(res => {
     
      this.getUserDetails();
      this.router.navigate(['home']);
      // this.toastr.success(res.message);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
    );
  }

  getUserDetails() {
    this.authservice.getUserDetails().pipe(first()).subscribe(res => {
      // this.toastr.success(res.message);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      if(this.previousUrl){
        this.router.navigate([this.previousUrl]).then(() => {
          window.location.reload();
        });
      }else{
        this.router.navigate([this.curUrl]).then(() => {
          window.location.reload();
        });
      }
     
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    });
  }

}
