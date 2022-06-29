import { Component, OnInit } from '@angular/core';
import { TopRatedProductsService } from '../../home/top-rated-products.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Extractor } from '@angular/compiler';
import { FavouriteService } from '../../favourite/favourite.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-shop4-columm',
  templateUrl: './shop4-columm.component.html',
  styleUrls: ['./shop4-columm.component.scss']
})
export class Shop4ColummComponent implements OnInit {


  productArr: any = [];
  TagArr: any = []
  filterObj: any = {};
  brandObj: any = {}
  priceForm: any = FormGroup;
  cateform: any = FormGroup
  priceFilterArr: any = [];
  priceFormSubmitted = false;
  ratingFormSubmitted = false;
  brandForm: any = FormGroup;
  brandFormSubmitted = false;
  tagFormSubmitted = false;
  categoryFormSubmitted = false;
  productListArr: any = [];
  orderReqArray: any = [];
  cartArr: any = [];
  listObj: any = {};
  favcolourbtn = false;
  faverbtn = true;
  favProductArr: any = [];
  customerFavoriteProductId: any;
  id:any
  shopSArr: any = []
  BrandArr: any = []
  categoryArr: any = []
  tagList: any = []

  productData: any = [];


  ratingList: any = []
  categoryObj: any = {}

  count: boolean = true
  countBrand: boolean = true
  countCategory: boolean = true
  res: any
  productBrand: any = []
  brandid: any
  categoryid: any
  cateArr: any = []
  cateid: any
  brandedid: any;
  searchArr: any = []

  productId:any;






  constructor(
    private topRatedService: TopRatedProductsService,
    private formBuilder: FormBuilder,
    private favService: FavouriteService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,

  ) {
    this.topRatedService.removeCart.subscribe((res: any) => {
      if (res) {
        this.getTopRatedProducts();
      }

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.topRatedService.removeCheckout.subscribe((res: any) => {
      if (res) {
        this.getTopRatedProducts();
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    this.topRatedService.seeCart.subscribe((res: any) => {
      if (res) {
        this.getTopRatedProducts();
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  ngOnInit(): void {
this.spinner.show();
    this.cateid = this.route.snapshot.params['id']

    this.brandedid = this.route.snapshot.params['id']

    this.priceForm = this.formBuilder.group({
      maxPrice: [null],
      minPrice: [null],
      ratingFilter: [null],
      tagFilter: [null],
      categoryFilter: [null],
      brandFilter: [null],
      productId: [null],
      favorite: [null],
      ratingList: [null],
      tagList: [null],
      brandId: [null],
      brandList: [null],
      categoryId: [null],
      productCategoryList: [null],
    })
    this.cateform = this.formBuilder.group({
      brandId: [null]

    })

    // this.favForm = this.formBuilder

    this.getTopRatedProducts();
    this.ratingProduct();
    this.brandProduct();
    this.categoryProduct();
    this.getCategoryId();
    this.getBrandId();
    this.search()



  }
  get f() { return this.priceForm.controls }

  getTopRatedProducts() {
    this.topRatedService.getTopRatedProducts().pipe(first()).subscribe(res => {
      this.productListArr = res.data;

      this.listObj = res.data;

      this.spinner.hide();
      this.toastr.success(res.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })

  }
  search() {
    this.priceFormSubmitted = true;
    if (this.priceForm.invalid) {
      return;
    }
    this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      this.priceFilterArr = res.data;
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  filter(value: any) {
    if (this.shopSArr.includes(value)) {
      this.shopSArr.splice(this.shopSArr.indexOf(value), 1)
    }

    else {
      this.shopSArr.push(value);
    }
    this.priceForm.patchValue({

      ratingList: this.shopSArr,
    })

    this.searchProduct()
  }
  brand(Tag: any) {
    if (this.TagArr.includes(Tag)) {
      this.TagArr.splice(this.TagArr.indexOf(Tag), 1)
    }
    else {
      this.TagArr.push(Tag);
    }
    this.priceForm.patchValue({
      brandList: this.TagArr,

    })
    this.brandSearch()
  }


  cartValues() {

    this.orderReqArray = this.topRatedService.getCartData();
    if (this.orderReqArray) {
      for (let i = 0; i < this.orderReqArray.length; i++) {
        for (let j = 0; j < this.productListArr.length; j++) {
          if (this.productListArr[j].id == this.orderReqArray[i].productId) {
            // this.productListArr[j].productId = this.orderReqArray[i].productId;
            this.productListArr[j].orderQty = this.orderReqArray[i].orderQty;
          }
        }
      }
    }
  }

  productcategory(category: any) {
    if (this.categoryArr.includes(category)) {
      this.categoryArr.splice(this.categoryArr.indexOf(category), 1)
    }
    else {
      this.categoryArr.push(category);
    }
    this.priceForm.patchValue({

      productCategoryList: this.categoryArr,

    })
    this.categorySearch()

  }
  ratingProduct() {
    this.topRatedService.filterProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      if (this.count) {
        this.filterObj = res.data
        this.count = false
        this.toastr.success(res.data);
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  searchProduct() {
    this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => { 
       this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  brandProduct() {
    this.topRatedService.filterProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      if (this.countBrand) {
        this.brandObj = res.data
        this.toastr.success(res.data);
        this.countBrand = false

      }

    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })

  }
  brandSearch() {
    this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }


  categoryProduct() {
    this.topRatedService.filterProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      if (this.countCategory) {
        this.categoryObj = res.data
        this.countCategory = false
        this.toastr.success(res.data);
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })



  }

  categorySearch() {
    this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
  getCategoryId() {

    this.priceForm.patchValue({
      categoryId: this.cateid
    })
    this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
      this.cateArr = res.data;
      this.toastr.success(res.data);
      this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
      if (this.cartArr) {
        for (let i = 0; i < this.cateArr.length; i++) {
          const found = this.cartArr.find((element: any) => this.cateArr[i].id === element.id);
          if (found) {
            this.cateArr[i].orderQty = found.orderQty;
          }
        }
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
  getBrandId() {
    this.cateform.patchValue({
      brandId: this.brandedid
    })
    this.topRatedService.searchProduct(this.cateform.value).pipe(first()).subscribe(res => {
      this.productBrand = res.data
      this.toastr.success(res.data);

      this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
      if (this.cartArr) {
        for (let i = 0; i < this.productBrand.length; i++) {
          const found = this.cartArr.find((element: any) => this.productBrand[i].id === element.id);
          if (found) {
            this.productBrand[i].orderQty = found.orderQty;
            // this.cateArr[i].productId = found.productId;
          }
        }
      }

    },
    err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }

  addToCart(obj: any) {
    for (let list of this.cateArr) {
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
    for (let list of this.cateArr) {
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
    for (let list of this.cateArr) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }

  }



    addCart(obj: any) {
    for (let list of this.productBrand) {
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

  toCheckInLocal(cartObj: any) {
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

  setLocal(obj: any) {
    var a;
    if (localStorage.getItem('cartData') === null) {
      a = [];
    } else {
      a = JSON.parse(localStorage.getItem('cartData')!);
    }
    a.push(obj);
    localStorage.setItem('cartData', JSON.stringify(a));
  }

  decreaseQty(obj: any) {
    for (let list of this.productBrand) {
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

  increaseQty(obj: any) {
    for (let list of this.productBrand) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }

  }
  onFav(listObj: any, isFav = false) {
    this.priceForm.patchValue({
      productId: listObj.productDtlId,
      favorite: true
    })
    if (isFav) {
      this.favService.createFav(this.priceForm.value).pipe(first()).subscribe(res => {
        this.favService.showFav();
        this.toastr.success(res.data);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
      this.faverbtn = false;
      this.favcolourbtn = true;
    } else {

      this.favService.deleteFav(listObj.id).pipe(first()).subscribe(res => {

        this.faverbtn = true;
        this.favcolourbtn = false;
        this.favService.showFav();
        this.toastr.success(res.data);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
    }
  }
 // getSearch(){
  //   if(this.cateform.value){
  //     this.topRatedService.searchProduct(this.cateform.value).pipe(first()).subscribe(res => {
  //       this.productBrand = res.data

  //       this.cartArr = JSON.parse(localStorage.getItem('cartData')!);
  //       if (this.cartArr) {
  //         for (let i = 0; i < this.productBrand.length; i++) {
  //           const found = this.cartArr.find((element: any) => this.productBrand[i].id === element.id);
  //           if (found) {
  //             this.productBrand[i].orderQty = found.orderQty;
  //             // this.cateArr[i].productId = found.productId;
  //           }
  //         }
  //       }

  //     })
  //   }
  //   else if(this.priceForm.value){
  //     this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
  //       this.priceFilterArr = res.data;
  //     })
  //   }


  // }

}



