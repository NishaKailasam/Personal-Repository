import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TopRatedProductsService } from '../../home/top-rated-products.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  productId: any;
  productObj: any = {};
  productListArr: any = [];
  productListObj: any = {};
  orderReqArray: any;
  priceList: any = {};
  productArr: any;
  productTag: any;
  cartArr: any;
  singleArr: any = [];
  productCartObj: any = {};
  productImg: any;
  activeQuantityIndex: number;
  quantityObj: any;
  enableAdd= true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public topRatedService: TopRatedProductsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.topRatedService.seeCart.subscribe((res: any) => {
      if(res){
      this.viewProduct(true);


      }
// this.viewProduct();

    })
//     this.topRatedService.viewCart.subscribe((res: any) => {
// this.viewProduct(true);
//     })
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.viewProduct();
    })
  }
  ngOnInit(): void {
   this.spinner.show();
    this.productId = this.route.snapshot.params[('id')]
    this.viewProduct();
    // this.productListArr = JSON.parse(localStorage.getItem('cartData')!);

  }
  viewProduct(onLoad = false, deletedItem?:any) {
    if(!onLoad){
    this.topRatedService.getSingleProduct(this.productId).pipe(first()).subscribe(res => {
      this.activeQuantityIndex = 0;

      // this.productImg = res.data.product.productImageList[0];
      this.productObj = res.data.product;
      this.productListArr = res.data.product;
      this.spinner.hide();
      // this.toastr.success(res.message);
      this.productTag = res.data.product.tagsList;
      this.updateCartInfo()

      // this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
      // if (this.cartArr) {

      //   const found = this.cartArr.find((element: any) => this.productObj.productDtlId === element.productDtlId);
      //   if (found) {
      //     this.productObj.orderQty = found.orderQty;
      //     this.productObj.productId = found.productId;
      //   }

      // }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  } else {
    this.spinner.hide();
    this.updateCartInfo(deletedItem);
  }
  }
  cartValues() {
    this.spinner.show();
    this.orderReqArray = this.topRatedService.getCartData();
    if (this.orderReqArray) {
      for (let i = 0; i < this.orderReqArray.length; i++) {
        for (let j = 0; j < this.productListArr.length; j++) {
          if (this.productObj[j].id == this.orderReqArray[i].productId) {
            this.productObj[j].productId = this.orderReqArray[i].productId;
            this.productObj[j].orderQty = this.orderReqArray[i].orderQty;
          }
        }
      }
    }
    this.spinner.hide();
  }

  addToCart(obj: any) {

      if (this.productObj.productDtlId == obj.productDtlId) {
        this.productObj.productId = this.productObj.productDtlId;
        this.productObj.orderQty = 1;
        this.productObj.productName = obj.productName;
        this.productObj.orderQuantityAmount = (this.productObj.orderQty * this.productObj.price);
        this.toCheckItsInLocal(this.productObj);
        this.topRatedService.getCart(this.productObj);
      }

  }

  decreaseQuantity(obj: any) {

      if (this.productObj.productDtlId == obj.productDtlId) {
        this.productObj.productId = this.productObj.productDtlId;
        if (this.productObj.orderQty > 1) {
          this.productObj.orderQty = this.productObj.orderQty - 1;
          this.productObj.orderQuantityAmount = (this.productObj.orderQty * this.productObj.price);
          this.toCheckItsInLocal(this.productObj);
          this.topRatedService.getCart(this.productObj);
        }
      }

  }

  addQuantity(obj: any) {

      if (this.productObj.productDtlId == obj.productDtlId) {
        this.productObj.productId = this.productObj.productDtlId;
        this.productObj.orderQty = this.productObj.orderQty + 1;
        this.productObj.orderQuantityAmount = (this.productObj.orderQty * this.productObj.price);
        this.toCheckItsInLocal(this.productObj);
        this.topRatedService.getCart(this.productObj);
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

  updateCartInfo(deletedItem?:any) {
    const localData = JSON.parse(localStorage.getItem('cartData')!);
    if(deletedItem){
     this.productObj.orderQty = null;
    }

    if (localData){
   const cart = localData.find((data: any) => data?.productDtlId === this.productObj.productDtlId);
      if (cart) {
        this.productObj.orderQty = cart.orderQty;
      }

  }
  }

}
