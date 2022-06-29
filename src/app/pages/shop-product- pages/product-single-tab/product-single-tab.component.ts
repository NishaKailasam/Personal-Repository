// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { first } from 'rxjs/operators';
// import { TopRatedProductsService } from '../../home/top-rated-products.service';
// import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';

// @Component({
//   selector: 'app-product-single-tab',
//   templateUrl: './product-single-tab.component.html',
//   styleUrls: ['./product-single-tab.component.scss']
// })
// export class ProductSingleTabComponent implements OnInit {

//   productId: any;
//   productObj: any = {};
//   productListArr: any = [];
//   productListObj: any = {};
//   orderReqArray: any;
//   priceList: any = {};
//   productArr: any;
//   productTag: any;
//   cartArr: any;
//   singleArr: any = [];
//   productCartObj: any = {};
//   productImg: any;
//   activeQuantityIndex: number;
//   quantityObj: any;
//   enableAdd= false;

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     public topRatedService: TopRatedProductsService,
//     private toastr: ToastrService,
//     private spinner: NgxSpinnerService
//   ) {
//     this.topRatedService.seeCart.subscribe((res: any) => {
// this.viewProduct();

//     })
//     this.topRatedService.viewCart.subscribe((res: any) => {
// this.viewProduct();
//     })
//     this.topRatedService.removeCart.subscribe((res: any) => {
//       this.viewProduct();
//     })
//   }
//   ngOnInit(): void {
//     this.productId = this.route.snapshot.params[('id')]
//     this.viewProduct();
//     // this.productListArr = JSON.parse(localStorage.getItem('cartData')!);

//   }
//   viewProduct() {
//     this.topRatedService.getSingleProduct(this.productId).pipe(first()).subscribe(res => {
//       this.activeQuantityIndex = 0;
     
//       // this.productImg = res.data.product.productImageList[0];
//       this.productObj = res.data.product;
//       this.productListArr = res.data.product;
//       this.productTag = res.data.product.tagsList;

//       // this.toastr.success(res.message)
//       // this.orderReqArray = this.topRatedService.getCartData();
//       // if (this.orderReqArray == null || this.orderReqArray?.length == 0) {
//       //   // this.quantityObj = this.productArr[0];
//       // } else {
//       //   this.getCartData();
//       // }
//       // this.singleArr = res.data;
//       // this.priceList = res.data.product.productImageList[0];
//       this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
//       if (this.cartArr) {
//         for (let i = 0; i < this.productListArr.length; i++) {
//         const found = this.cartArr.find((element: any) => this.productObj.productDtlId === element.productDtlId);
//         if (found) {
//           this.productListArr.orderQty = found.orderQty;
//           this.productListArr.productId = found.productId;
//         }
//          }
//       }
//     },
//     err => {
//       this.spinner.hide();
//       this.toastr.error(err.error.error.reason);
//     })
//   }
//   cartValues() {
//     this.spinner.show();
//     this.orderReqArray = this.topRatedService.getCartData();
//     if (this.orderReqArray) {
//       for (let i = 0; i < this.orderReqArray.length; i++) {
//         for (let j = 0; j < this.productListArr.length; j++) {
//           if (this.productObj[j].id == this.orderReqArray[i].productId) {
//             this.productObj[j].productId = this.orderReqArray[i].productId;
//             this.productObj[j].orderQty = this.orderReqArray[i].orderQty;
//           }
//         }
//       }
//     }
//     this.spinner.hide();
//   }

//   addToCart(obj: any) {
//     for (let list of this.productListArr) {
//       if (list.productDtlId == obj.productDtlId) {
//         list.productId = list.id;
//         list.orderQty = 1;
//         list.productName = obj.name;
//         list.orderQuantityAmount = (list.orderQty * list.price);
//         this.toCheckItsInLocal(list);
//         this.enableAdd = true;
//       }
//     }
//   }

//   decreaseQuantity(obj: any) {
//     for (let list of this.productListArr) {
//       if (list.id == obj.id) {
//         if (list.orderQty > 1) {
//           list.orderQty = list.orderQty - 1;
//           list.orderQuantityAmount = (list.orderQty * list.price);
//           this.toCheckItsInLocal(list);
//         }
//       }
//     }
//   }

//   addQuantity(obj: any) {
//     for (let list of this.productListArr) {
//       if (list.id == obj.id) {
//         list.orderQty = list.orderQty + 1;
//         list.orderQuantityAmount = (list.orderQty * list.price);
//         this.toCheckItsInLocal(list);
//       }
//     }
//   }

//   toCheckItsInLocal(cartObj: any) {
//     this.orderReqArray = this.topRatedService.getCartData();
//     if (this.orderReqArray) {
//       for (let i = 0; i < this.orderReqArray.length; i++) {
//         if (cartObj.productId == this.orderReqArray[i].productId) {
//           this.orderReqArray.splice(i, 1);
//         }
//       }
//       localStorage.setItem('cartData', JSON.stringify(this.orderReqArray));
//       this.setToLocal(cartObj);
//     } else {
//       this.setToLocal(cartObj);
//     }
//   }

//   setToLocal(obj: any) {
//     var a;
//     if (localStorage.getItem('cartData') === null) {
//       a = [];
//     } else {
//       a = JSON.parse(localStorage.getItem('cartData')!);
//     }
//     a.push(obj);
//     localStorage.setItem('cartData', JSON.stringify(a));
//   }
 
// }
