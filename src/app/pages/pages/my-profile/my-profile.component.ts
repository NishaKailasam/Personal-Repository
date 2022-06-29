import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/core/helpers/must-match.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  @ViewChild('closeModal')
  closeModal!: ElementRef;
  addressArr: any = [];
  addressForm: any = FormGroup;
  addressFormSubmitted = false;
  profileFormSubmitted=false;
  countryArr: any = [];
  stateArr: any = [];
  cityArr: any = [];
  profileArr: any = [];
  contactForm: any = FormGroup;
  contactFormSubmitted = false;
  passwordForm: any;
  passwordFormSubmitted = false;
  profileForm!: FormGroup;
  base64Output!: string;
  imageFile: any;
  imgBase64!: string;
  fileBase64: any = "";
  imageSource: any = ''
  imagePath: any;
  base64textString = '';
  contactArr: any=[];
  mobileNo: any;
  profile: any = {};
  contact: any
  buttonText: string;
  pwd:any;
  profileEdit: any
  modal: any;
  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.addressForm = this.formBuilder.group({
      addressType: [null, Validators.required],
      location: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      landMark: [null, Validators.required],
      postalCode: [null, Validators.required],
      addressLine1: [null, Validators.required],
      cityId: [null, Validators.required],
      stateId: [null, Validators.required],
      countryId: [null, Validators.required],
      name: [null, Validators.required],
      mobileNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      id: [null]
    })
    this.profileForm = this.formBuilder.group({
      fileBase64: [null],
      fileName: [null],
      fileUrl: [null],
      mobileNo: [null],
      userId: [null],
      fullName: [null,Validators.required],
      email: [null,Validators.required],
    
    })
    this.contactForm = this.formBuilder.group({
      title: [null, Validators.required],
      mobileNo: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      id: [null]
    })
    this.passwordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }

    )

    this.getUserProfile();
    this.getCountry();
    this.getAddress();
    this.getUserContact();

  }


  get j() { return this.profileForm.controls };
  get f() { return this.addressForm.controls };
  get k() { return this.contactForm.controls };
  get i() { return this.passwordForm.controls };
  openModal(myModalId: any) {
    this.buttonText = "Submit";
    this.contactForm.reset({});
    this.addressForm.reset({});
    this.passwordForm.reset({});
    this.pwd = "";
    this.contactFormSubmitted = false;
    this.addressFormSubmitted = false;
    this.passwordFormSubmitted = false;
    this.modalService.open(myModalId, { size: 'sm' });
  }



  getAddress() {
    this.profileService.getAddress().pipe(first()).subscribe(res => {
      this.addressArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.data.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  onSubmitContact(modal: any) {
    // for (const key in this.contactForm.controls) {
    //   if (key != 'id') {
    //     this.contactForm.get(key)?.setValidators(Validators.required);
    //     this.contactForm.get(key)?.updateValueAndValidity();
    //   }
    // }
    this.contactFormSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    if (this.contactForm.value.id) {
      this.profileService.updateMobileNumber(this.contactForm.value).pipe(first()).subscribe(res => {

        this.toastr.success(res.data);
        this.getUserContact();
        modal.dismiss("cross click");
      },
        err => {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      )
    } else {
      this.profileService.createMobileNumber(this.contactForm.value).pipe(first()).subscribe(res => {
        this.getUserContact();
        modal.dismiss("cross click");

        this.toastr.success(res.data);
      },
        err => {
          modal.dismiss("cross click");
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        })
    }
  }
  // openModal(modal: any) {
  //   this.buttonText = "Submit";
  //   this.contactForm.reset({});
  //   this.contactFormSubmitted = false;
  //   this.addressForm.reset({});
  //   this.addressFormSubmitted=false;
  //   this.modalService.open(modal, { size: 'sm' });
  // }

  onSubmit(modal: any) {
    // for (const key in this.addressForm.controls) {
    //   if (key != 'id') {
    //     this.addressForm.get(key)?.setValidators(Validators.required);
    //     this.addressForm.get(key)?.updateValueAndValidity();
    //   }
    // }
    this.addressFormSubmitted = true;
    if (this.addressForm.invalid) {
      return;
    }
    if (this.addressForm.value.id) {
      this.profileService.updateAddress(this.addressForm.value).pipe(first()).subscribe(res => {
        this.getAddress();
        this.toastr.success(res.data);
        // $('#addressModal').modal('hide');
        modal.dismiss("cross click");
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
    } else {
      this.profileService.createAddress(this.addressForm.value).pipe(first()).subscribe(res => {
        this.getAddress();
        this.toastr.success(res.data);
        // $('#addressModal').modal('hide');
        modal.dismiss("cross click");
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
    }

  }
  onProfileUpdate() {
    this.profileFormSubmitted = true;
    if (this.profileForm.invalid) {
      return;
    }

    this.profileService.updateUserProfile(this.profileForm.value).pipe(first()).subscribe(res => {
      this.getUserProfile();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      this.toastr.success(res.data);
      $('#profile-edit').modal('hide');

    },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
        $('#profile-edit').modal('hide');

      })
  }

  onClick(modal: any) {
    // for (const key in this.passwordForm.controls) {
    //   this.passwordForm.get(key)?.setValidators(Validators.required);
    //   this.passwordForm.get(key)?.updateValueAndValidity();
    // }
    this.passwordFormSubmitted = true;
    if (this.passwordForm.invalid) {
      return;
    }

    //   delete(modal) {
    //     alert('Are you sure want to delete?')
    //     this.spinner.show();
    //     this.locationService.deleteCity(this.cityId).pipe(first()).subscribe(res => {
    //       this.getCity(this.stateId);
    //       modal.dismiss('cross click');
    //     }, err => {
    //       modal.dismiss('cross click');
    //       this.spinner.hide();
    //       this.toastr.error(err.error.error.reason);
    //     })
    //   }
    // }


    this.profileService.changePassword(this.passwordForm.value).pipe(first()).subscribe(res => {
      // this.closeModal.nativeElement.click();
      modal.dismiss("cross click");

      this.toastr.success(res.data);
    },
      err => {
        this.spinner.hide();
        modal.dismiss("cross click");
        this.toastr.error(err.error.error.reason);
      })
  }

  removeProfileValidation() {
    for (const key in this.profileForm.controls) {
      this.profileForm.get(key)?.clearValidators();
      this.profileForm.get(key)?.updateValueAndValidity();
      this.profileForm.get(key)?.patchValue(null);
    }
  }
  removePasswordValidation() {
    //   for (const key in this.passwordForm.controls) {
    //     this.passwordForm.get(key)?.clearValidators();
    //     this.passwordForm.get(key)?.updateValueAndValidity();
    //     this.passwordForm.get(key)?.patchValue(null);
    //   }
  }
  removeValidation() {
    for (const key in this.addressForm.controls) {
      this.addressForm.get(key)?.clearValidators();
      this.addressForm.get(key)?.updateValueAndValidity();
      this.addressForm.get(key)?.patchValue(null);
    }
  }
  removeValidators() {
    for (const key in this.contactForm.controls) {
      this.contactForm.get(key)?.clearValidators();
      this.contactForm.get(key)?.patchValue(null);
      this.contactForm.get(key)?.updateValueAndValidity();
    }
  }

  getUserProfile() {
    this.profileService.getUserProfile().pipe(first()).subscribe(res => {
      // this.toastr.success(res.message);
      this.profile = res.data;

    })
  }

  getUserContact() {
    this.profileService.getContactNumber().pipe(first()).subscribe(res => {
      this.contactArr = res.data;
      // this.toastr.success(res.data.message);
    })
  }

  handleAddressChange(address: any) {
    (this.addressForm).get("latitude").patchValue(address.geometry.location.lat());
    (this.addressForm).get("longitude").patchValue(address.geometry.location.lng());
    // (this.addressForm.get("postalCode").patchValue(address.address_components[4].long_name));
    (this.addressForm).get("location").patchValue(address.formatted_address);
  }


  editProfile() {
    this.profileService.getUserProfile().pipe(first()).subscribe(res => {
      this.profileForm.patchValue({
        userId: this.profile.userId,
        fullName: this.profile.fullName,
        email: this.profile.email,
        fileName: this.profile.fileName,
        mobileNo: this.profile.mobileNo
      });
      //  this.buttonText = "Update";
      //  this.modalService.open(profileEdit, { size: 'sm' });
    })

  }

  editAddress(modal: any, id: any) {
    this.profileService.editAddress(id).pipe(first()).subscribe(res => {
      this.addressForm.patchValue({
        addressType: res.data.addressType,
        location: res.data.location,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        landMark: res.data.landMark,
        postalCode: res.data.postalCode,
        addressLine1: res.data.addressLine1,
        addressLine2: res.data.addressLine2,
        cityId: res.data.cityId,
        stateId: res.data.stateId,
        countryId: res.data.countryId,
        name: res.data.name,
        mobileNo: res.data.mobileNo,
        id: res.data.id
      })

      this.profileService.getState(res.data.countryId).pipe(first()).subscribe(res => {
        this.stateArr = res.data;
        // this.toastr.success(res.data.message);
      },
        err => {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        })
      this.profileService.getCity().pipe(first()).subscribe(res => {
        this.cityArr = res.data;
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.buttonText = "Update";
    this.modalService.open(modal, { size: 'sm' });
  }

  deleteAddress(address: any) {
    this.profileService.deleteAddress(address.id).pipe(first()).subscribe(res => {
      this.getAddress();
      $('#delete-Address').modal('hide');

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
      $('#delete-Address').modal('hide');

    })
  }

  deleteContact(contact: any) {
    this.profileService.deleteNumber(contact.id).pipe(first()).subscribe(res => {
      this.getUserContact();
      $('#deleteModal').modal('hide');

      this.toastr.success(res.data);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
      $('#deleteModal').modal('hide');
    })
  }

  editContact(contactAdd: any, id: any) {
    this.profileService.getSingleNumber(id).pipe(first()).subscribe(res => {
      this.contactForm.patchValue({
        title: res.data.title,
        mobileNo: res.data.mobileNo,
        id: res.data.id
      })
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.buttonText = "Update";
    this.modalService.open(contactAdd, { size: 'sm' });
  }
  getCountry() {
    this.profileService.getCountry().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
      // this.toastr.success(res.data.message);
    },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
  }
  getState(event: any) {
    this.profileService.getState(event).pipe(first()).subscribe(res => {
      this.stateArr = res.data;
      // this.toastr.success(res.data.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
  getCity(event: any) {
    this.profileService.getCity().pipe(first()).subscribe(res => {
      this.cityArr = res.data;
      // this.toastr.success(res.data.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  mustMatch(){

    let password = this.passwordForm.get('oldPassword').value;
    let newPassword =  this.passwordForm.get('newPassword').value;
    if (newPassword === password) {
      this.pwd = "*Old and new password are same";
  } else {
      this.pwd = "";
  }
  }
  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    this.profileForm.value.fileName = file.name
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  handleReaderLoaded(e: any) {
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
    this.profileForm.value.fileBase64 = this.base64textString
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  togglePasswordText() {
    this.passwordText = !this.passwordText;

  }
  toggleConfirmPasswordText() {
    this.confirmPasswordText = !this.confirmPasswordText;

  }

  public passwordTextType: boolean;
  public passwordText: boolean;
  public confirmPasswordText: boolean;

}
