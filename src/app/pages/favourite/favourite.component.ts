import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FavouriteService } from './favourite.service';
import { TopRatedProductsService } from '../home/top-rated-products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  favProductArr: any = [];
  cartArr:any=[];
  orderReqArray: any = [];
  productObj: any = {};
  calculationArray: any = [];
  calculateObj: any = {};
  productId : any
  constructor(
    private favService: FavouriteService,
    private topRatedService: TopRatedProductsService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
  ) {
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.getFav();
    } ,
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.topRatedService.removeCheckout.subscribe((res: any) => {
      this.getFav();
    } ,
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.topRatedService.seeCart.subscribe((res:any) =>{
      this.getFav();
    } ,
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getFav();
  }
  getFav() {
    this.favService.getFav().pipe(first()).subscribe(res => {
      this.favProductArr = res.data;
      
      this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
      if (this.cartArr) {
        for (let i = 0; i < this.favProductArr.length; i++) {
          const found = this.cartArr.find((element: any) => this.favProductArr[i].id === element.id);
          if (found) {
            this.favProductArr[i].orderQty = found.orderQty;
            this.favProductArr[i].productId = found.productId;
          }
        }
      }
      this.spinner.hide();
      // this.toastr.success(res.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
  cartValues() {

    this.orderReqArray = this.favService.getFav();
    if (this.orderReqArray) {
      for (let i = 0; i < this.orderReqArray.length; i++) {
        for (let j = 0; j < this.favProductArr.length; j++) {
          if (this.favProductArr[j].id == this.orderReqArray[i].productId) {
            this.favProductArr[j].productId = this.orderReqArray[i].productId;
            this.favProductArr[j].orderQty = this.orderReqArray[i].orderQty;
          }
        }
      }
    }

  }

  addToCart(obj: any) {
    for (let list of this.favProductArr) {
      if (list.id == obj.id) {
        list.productId = list.id;
        list.orderQty = 1;
        // list.productName = obj.name;
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
    for (let list of this.favProductArr) {
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
    for (let list of this.favProductArr) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }
  openModal(data: any) {
    this.productObj = data;
  }
  // removeWishlist(customerFavoriteProductId:any) {

  //   this.favService.deleteFav(customerFavoriteProductId).pipe(first()).subscribe(res => {
  //     this.getFav();
  //   })

  // }
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
}
