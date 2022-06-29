import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  productSubmitted = false;
  contactForm!: FormGroup;
  contactArr: any=[];

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],
    })
  }
  get f() {
    return this.contactForm.controls
  }

  onSubmit() {
    this.productSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.contactService.createContact(this.contactForm.value).pipe(first()).subscribe(res => {
      this.contactArr=res.data;
// this.toastr.success(res.data)
  }
  ,
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    });
  }
}
