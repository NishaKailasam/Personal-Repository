import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BrandService } from '../brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TopRatedProductsService } from '../../home/top-rated-products.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-brand-single',
  templateUrl: './brand-single.component.html',
  styleUrls: ['./brand-single.component.scss']
})
export class BrandSingleComponent implements OnInit {
  singleBrandArr: any = [];
  brandId: any;
  orderReqArray:any=[];
  id:any;
  cartArr:any=[];
  singleBrandObj:any={};

  constructor(
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private topRatedService:TopRatedProductsService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ) {
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.singleBrand();
    })
    this.topRatedService.removeCheckout.subscribe((res: any) => {
      this.singleBrand();
    })
    this.topRatedService.viewCart.subscribe((res:any) =>{
      this.singleBrand();
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    this.brandId = this.route.snapshot.params[('id')];
    this.singleBrand();
  }
  singleBrand() {

    this.brandService.getSingleBrand(this.brandId).pipe(first()).subscribe(res => {
      this.singleBrandArr = res.data;
      this.singleBrandObj = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
      this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
      if (this.cartArr) {
        for (let i = 0; i < this.singleBrandArr.length; i++) {
          const found = this.cartArr.find((element: any) => this.singleBrandArr[i].id === element.id);
          if (found) {
            this.singleBrandArr[i].orderQty = found.orderQty;
            this.singleBrandArr[i].productId = found.productId;
          }
        }
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })

  }

  cartValues() {

    this.orderReqArray = this.topRatedService.getCartData();
    if (this.orderReqArray) {
      for (let i = 0; i < this.orderReqArray.length; i++) {
        for (let j = 0; j < this.singleBrandArr.length; j++) {
          if (this.singleBrandArr[j].id == this.orderReqArray[i].productId) {
            this.singleBrandArr[j].productId = this.orderReqArray[i].productId;
            this.singleBrandArr[j].orderQty = this.orderReqArray[i].orderQty;
          }
        }
      }
    }

  }

  addToCart(obj: any) {
    for (let list of this.singleBrandArr) {
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

  toCheckItsInLocal(cartObj: any) {
    this.orderReqArray = this.topRatedService.getCartData();
    if (this.orderReqArray) {
      for (let i = 0; i < this.orderReqArray.length; i++) {
        if (cartObj.productId == this.orderReqArray[i].productId) {
          this.orderReqArray.splice(i, 1);
        }
      }
      localStorage.setItem('cartData', JSON.stringify(this.orderReqArray));
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

  decreaseQuantity(obj: any) {
    for (let list of this.singleBrandArr) {
      if (list.id == obj.id) {
        if (list.orderQty > 1) {
          list.orderQty = list.orderQty - 1;
          list.orderQuantityAmount = (list.orderQty * list.price);
          this.toCheckItsInLocal(list);
          this.topRatedService.getCart(list);
        }
      }
    }
  }

  increaseQuantity(obj: any) {
    for (let list of this.singleBrandArr) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }


}
