import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { stringify } from '@angular/compiler/src/util';
import { __values } from 'tslib';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: any = FormGroup;
  signUpFormSubmitted = false;
  curUrl: any;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userId: [null],
      fullName: [null, Validators.required],
      email: [null,Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      mobileNo:[null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      userName: [null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }

    )
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  togglePasswordText() {
    this.passwordText = !this.passwordText;

  }

  get f() {
    return this.signUpForm.controls;
  }
  onSubmit() {
    this.signUpFormSubmitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    this.authService.createSignUp(this.signUpForm.value).pipe(first()).subscribe(res => {
      // this.authService.getName(this.signUpForm.value);
      localStorage.setItem('token', res.data.jwt);
      localStorage.setItem('otp', res.data.otp);
      localStorage.setItem('signUpUserDTO', JSON.stringify(this.signUpForm.value));
      this.signUpForm.reset({});
      this.signUpFormSubmitted = false;
      this.router.navigate(['/verification']);
      this.toastr.success(res.data.message);

    },
    err => {
   
      this.toastr.error(err.error.error.reason);
    })

  }
  public passwordTextType: boolean;
  public passwordText: boolean;

  // public showPassword: boolean;
  // public showPasswordOnPress: boolean;
 name = 'Angular';

}
