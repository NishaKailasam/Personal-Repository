import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { TopRatedProductsService } from '../../home/top-rated-products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from './checkout.service';
import { first } from 'rxjs/internal/operators/first';
import { NgxSpinnerService } from 'ngx-spinner';

// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../pages/profile.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare let $:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef
  // title = 'google-places-autocomplete';
  // @ViewChild("placesRef") placesRef!: GooglePlaceDirective;
 i:any;
  productListArr: any = [];
  calculationArray: any = [];
  calculateObj: any = {};
  addressForm!: FormGroup;
  addressFormSubmitted = false;
  addressArr: any = [];
  contactForm!: FormGroup;
  contactArr: any = [];
  contactFormSubmitted = false;
  conditionForm!: FormGroup;
  conditionFormSubmitted = false;
  buttonText: any = "Submit"
  userAddress: any;
  userLatitude: any;
  userLongitude: any;
  createOrderArr:any=[];
  orderCreationObj:any={};
  deliveryAddressObj:any={};
  activeAddressIndex:any;
  stateArr:any=[];
  countryArr:any=[];
  cityArr:any=[];
  profileObj:any={};
  orderId:any;
  orderArr:any=[];
  orderObj:any={};
  productObj:any={};
  activateContactIndex:any;
  selectContactObj:any={};
  contact:any;
  modal:any;
  public showCouponCode = false;

  constructor(
    public topRatedService: TopRatedProductsService,
    private formBuilder: FormBuilder,
    public checkoutService: CheckoutService,
    public profileService:ProfileService,
    // public zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private modalService: NgbModal
  ) {
    this.topRatedService.viewCart.subscribe((res: any) => {
     this.productListArr = JSON.parse(localStorage.getItem('cartData')!);
     this.calculation();
    })
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.productListArr = JSON.parse(localStorage.getItem('cartData')!);

      this.calculation();
    })
    this.topRatedService.seeCart.subscribe((res:any) =>{
      this.productListArr = JSON.parse(localStorage.getItem('cartData')!);

      this.calculation();
    })
  }

  ngOnInit(): void {
    this.spinner.show();
    this.addressForm = this.formBuilder.group({
      addressType: [null, Validators.required],
      name:[null,Validators.required],
      mobileNo: [null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      addressLine1: [null, Validators.required],
      // addressLine2: [null, Validators.required],
      landMark: [null, Validators.required],
      postalCode: [null, Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      cityId: [null, Validators.required],
       id:[null]
    })
    this.contactForm = this.formBuilder.group({
      title: [null, Validators.required],
      mobileNo: [null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      id:[null]
    })
    this.conditionForm = this.formBuilder.group({

      acceptTerms: [false, Validators.requiredTrue]
    })
    this.productListArr = JSON.parse(localStorage.getItem('cartData')!);
    this.calculation();
    this.getContactNumber();
    this.getAddress();
    this.getCountry();
  }
  get f() {
    return this.addressForm.controls;
  }
  get k() {
    return this.contactForm.controls;
  }
  get j() {
    return this.conditionForm.controls;
  }
openCheckModal(modal:any){
  this.buttonText = "Submit";
  this.contactForm.reset({});
  this.contactFormSubmitted = false;
  this.addressForm.reset({});
  this.addressFormSubmitted = false;
  this.modalService.open(modal, { size: 'sm' });
}
  onClick(modal:any) {
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
    // this.spinner.show();
if (this.contactForm.value.id) {
      this.profileService.updateMobileNumber(this.contactForm.value).pipe(first()).subscribe(res => {
        this.getContactNumber();
        modal.dismiss("cross click");

       this.toastr.success(res.data);
      }
      , err => {
        if (err.error.error.errorList) {
          for(let i = 0; i < err.error.error.errorList.length;i++ ){

          }
      }
      })
    } else {
      this.profileService.createMobileNumber(this.contactForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
        this.getContactNumber();
        modal.dismiss("cross click");

      })
    }
  }
  onSubmit(modal:any) {
    // for (const key in this.addressForm.controls) {
    //   if (key != 'id'){
    //   this.addressForm.get(key)?.setValidators(Validators.required);
    //   this.addressForm.get(key)?.updateValueAndValidity();
    //   }
    // }
    this.addressFormSubmitted = true;
    if (this.addressForm.invalid) {
      return;
    }
    if(this.addressForm.value.id){
      this.profileService.updateAddress(this.addressForm.value).pipe(first()).subscribe(res=>{
        this.toastr.success(res.data);
        this.getAddress();
        modal.dismiss("cross click");

      })
    }else  {
    //  this.addressForm.removeControl('id');

    this.profileService.createAddress(this.addressForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
      this.getAddress();
      modal.dismiss("cross click");

    })
  }
  }
  getCountry() {
    this.profileService.getCountry().pipe(first()).subscribe(res => {

      this.countryArr = res.data;
      // this.toastr.success(res.message);
    })
  }
  getState(event: any) {
    this.profileService.getState(event).pipe(first()).subscribe(res => {
      this.stateArr = res.data;
      // this.toastr.success(res.message);
    })
  }
  getCity(event: any) {
    this.profileService.getCity().pipe(first()).subscribe(res => {
      this.cityArr = res.data;
      // this.toastr.success(res.message);
    })
  }
  getAddress() {
    this.profileService.getAddress().pipe(first()).subscribe(res => {
      this.addressArr = res.data;
      if (this.addressArr.length > 0) {
                  if (this.addressForm.value.name) {
                      for (let i = 0; i < this.addressArr.length; i++) {
                          if (this.addressArr[i].name == this.addressForm.value.name) {
                              this.deliveryAddressObj.id = this.addressArr[i].id;
                              this.activeAddressIndex = i;
                          }
                      }
                  } else {
                      this.deliveryAddressObj.id = this.addressArr[0].id;
                      this.activeAddressIndex = 0;
                  }
              }
              this.spinner.hide();
              // this.toastr.success(res.message);
            }, err => {
              this.spinner.hide();
              this.toastr.error(err.error.error.reason);
            })
  }

selectAddress(address: any, i: any) {
  this.activeAddressIndex = i;
  this.deliveryAddressObj.id = address.id;
}
selectContact(contact:any,i:any){

  this.activateContactIndex=i;
  this.selectContactObj.id =contact.id
}

editAddress(addAddress:any ,id:any) {

  this.profileService.editAddress(id).pipe(first()).subscribe(res => {
      // this.addressObj = res.data;
      this.addressForm.patchValue({
        addressType:res.data.addressType,
        name:res.data.name,
        mobileNo:res.data.mobileNo,
        location:res.data.location,
        latitude:res.data.latitude,
        longitude: res.data.longitude,
        landMark:res.data.landMark,
        postalCode:res.data.postalCode,
        addressLine1:res.data.addressLine1,
        addressLine2:res.data.addressLine2,
        cityId:res.data.cityId,
        stateId:res.data.stateId,
        countryId:res.data.countryId,
        id:res.data.id
      })
      this.profileService.getState(res.data.countryId).pipe(first()).subscribe((res: { data: any; }) => {
          this.stateArr = res.data;

      })
      this.profileService.getCity().pipe(first()).subscribe((res: { data: any; }) => {
          this.cityArr = res.data;

      })
      this.buttonText =  "update"
      this.modalService.open(addAddress,{size:'sm'});

  })
}
deleteAddress(addAddress:any,id:any){
  this.profileService.deleteAddress(id).pipe(first()).subscribe(res =>{
    $('#deleteAddress').modal('hide');
    this.getAddress();
    // this.toastr.success(res.message);
}, err => {
  this.spinner.hide();
  this.toastr.error(err.error.error.reason);
  $('#deleteAddress').modal('hide');
})
}
getContactNumber(){
  this.profileService.getContactNumber().pipe(first()).subscribe(res=>{
    this.contactArr = res.data;
    // this.toastr.success(res.message);
    if (this.contactArr.length > 0) {
      if (this.contactForm.value.name) {
          for (let i = 0; i < this.contactArr.length; i++) {
              if (this.contactArr[i].name == this.contactForm.value.name) {
                  this.selectContactObj.id = this.contactArr[i].id;
                  this.activateContactIndex = i;
              }
          }
      } else {
          this.selectContactObj.id = this.contactArr[0].id;
          this.activateContactIndex = 0;
      }
  }
  })
}
editContact(contactAdd :any ,id:any){
  this.profileService.getSingleNumber(id).pipe(first()).subscribe(res=>{

    // this.contactArr = res.data;
    this.contactForm.patchValue({
      title: res.data.title,
      mobileNo: res.data.mobileNo,
      id: res.data.id
    })
  })
  this.buttonText = "Update"
  this.modalService.open(contactAdd,{size:'sm'});

}
deleteContact(contactAdd:any,id:any){
  this.profileService.deleteNumber(id).pipe(first()).subscribe(res=>{
    $('#deleteModal').modal('hide');
    this.getContactNumber();
    // this.toastr.success(res.data.message);
  }, err => {
    this.spinner.hide();
    this.toastr.error(err.error.error.reason);
    $('#deleteModal').modal('hide');
  })
}
  onProceed() {
    this.conditionFormSubmitted = true;
    if (this.conditionForm.invalid) {
      return;
    }
    this.orderCreationObj.deliveryAddressId = this.deliveryAddressObj.id;
    if (this.orderCreationObj.deliveryAddressId == null) {
        return
    }
    this.orderCreationObj.customerOrderItemsList = this.productListArr;
    this.orderCreationObj.paymentMode = "CASH_ON_DELIVERY";
    // this.orderCreationObj.orderStatus = "CONFIRMED";
    this.orderCreationObj.deliveryFee = 0;
    this.orderCreationObj.discAmount = 0;
    this.orderCreationObj.grandTotal = this.calculateObj.totalCost;
    this.orderCreationObj.subTotal = this.calculateObj.totalCost;
    this.checkoutService.createOrder(this.orderCreationObj).pipe(first()).subscribe(async res => {
       this.toastr.success(res.message);
      this.orderId=res.data
      this.checkoutService.singleOrder(this.orderId).pipe(first()).subscribe(res=>{
        // this.toastr.success(res.message);
        this.orderArr = res.data;

        this.router.navigate(['/order/', this.orderId ]);

      })
     localStorage.removeItem('cartData');
     this.topRatedService.getRemove();
     this.productListArr=[];

    })

}

  removeValidators() {
    for (const key in this.contactForm.controls) {
      this.contactForm.get(key)?.clearValidators();
      this.contactForm.get(key)?.patchValue(null);
      this.contactForm.get(key)?.updateValueAndValidity();
    }
  }

  removeValidation() {
    for (const key in this.addressForm.controls) {
      this.addressForm.get(key)?.clearValidators();
      this.addressForm.get(key)?.patchValue(null);
      this.addressForm.get(key)?.updateValueAndValidity();
    }
  }
  handleAddressChange(address: any) {
    this.addressForm.get("latitude")?.patchValue(address?.geometry?.location?.lat());
    this.addressForm.get("longitude")?.patchValue(address.geometry.location.lng());
    // this.addressForm.get("postalCode")?.patchValue(address.address_components[4].long_name);
    this.addressForm.get("location")?.patchValue(address.formatted_address);

  }

  calculation() {
    let isProductOwner = JSON.parse(localStorage.getItem('cartData')!);
    this.calculationArray = isProductOwner;
    if (this.calculationArray) {
      let totalCost = 0;
      let totalDiscount = 0;
      for (let i = 0; i < this.calculationArray.length; i++) {
        let orderQuantityAmount = this.calculationArray[i].orderQuantityAmount;
        totalCost = totalCost + orderQuantityAmount;
      }
      this.calculateObj.totalCost = totalCost;
      this.calculateObj.length = this.calculationArray.length;
    }
  }
  decreaseQuantity(obj: any) {
    for (let list of this.productListArr) {
      if (list.id == obj.id) {
        if (list.orderQty > 1) {
          list.orderQty = list.orderQty - 1;
          this.productObj.orderQty = list.orderQty;
          list.orderQuantityAmount = (list.orderQty * list.price);
          this.toCheckItsInLocal(list);
          this.topRatedService.getCart(list);
        }
      }
    }
  }

  increaseQuantity(obj: any) {

    for (let list of this.productListArr) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        this.productObj.orderQty = list.orderQty;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }
  toCheckItsInLocal(cartObj: any) {
    let productListArr = this.topRatedService.getCartData();
    if (productListArr) {
      for (let i = 0; i < productListArr.length; i++) {
        if (cartObj.productId == productListArr[i].productId) {
          productListArr.splice(i, 1);
        }
      }
      localStorage.setItem('cartData', JSON.stringify(productListArr));
      this.setToLocal(cartObj);
    } else {
      this.setToLocal(cartObj);
    }
  }
  setToLocal(obj: any) {
    var a;
    if (localStorage.getItem('cartData') === null) {
      a = [];
    } else {
      a = JSON.parse(localStorage.getItem('cartData')!);
    }
    a.push(obj);
    localStorage.setItem('cartData', JSON.stringify(a));
  }
  addToCart(obj: any) {
    for (let list of this.productListArr) {
      if (list.id == obj.id) {
        list.productId = list.id;
        list.orderQty = 1;
        list.productName = obj.name;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }
  removeWishlist(productId: any) {
    for (var i = 0; i < this.productListArr.length; i++) {
      if (this.productListArr[i].productId == productId) {
        this.productListArr.splice(i, 1);
        break;

      }
    }
    localStorage.setItem('cartData', JSON.stringify(this.productListArr));
    // this.getCartData();
    this.calculation();
    this.topRatedService.getRemoveCheckout();
    this.topRatedService.getRemove();

  }
openModal(data:any){
 this.productObj = data;
}

}
