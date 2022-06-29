import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changeForm!: FormGroup;
  changeFormSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }
  get f() {
    return this.changeForm.controls;
  }
  onSubmit() {
    this.changeFormSubmitted = true;
    if (this.changeForm.invalid) {
      return;
    }
    this.authService.changePassword(this.changeForm.value).pipe(first()).subscribe(res => {
      this.router.navigate(['/home'])
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
}



