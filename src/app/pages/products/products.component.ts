import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FavouriteService } from '../favourite/favourite.service';
import { TopRatedProductsService } from '../home/top-rated-products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
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
  id: any
  shopsArr: any = []
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
  productId: any;
  categoryFilter: any = []
  brandFilter: any = []
  ratingArr: any = []
  searchproduct: any = []
  productbrand: any;
  productcate: any
  brandorder: string = '';
  cartData: any;
  categoryId: any;
  filterBrandArr: any;
  filterCategoryArr: any;
  brandProductArr: any;
  cateProductArr: any;
  searchKeyProduct: string;
  getSearchKey: any;
  searchKey: any;
  brandId: any
  priceArr: any;
  searchProduct: any;
  filterArr: any;
  filterCategory: any;
  ratingFilterArr: any;
  ratingCategoryArr: any;
  ratingForm: any = FormGroup;
  filterSearch: any;
  selectedBrandId: any = [];
  selectedCategoryId: any = [];
  selectedRatingId: any = [];
  paramBrandId: any;
  ding = true;
  singleCategory: any={};
  singleBrand: any={};

  constructor(
    private topRatedService: TopRatedProductsService,
    private formBuilder: FormBuilder,
    private favService: FavouriteService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService

  ) {
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.getCategory(this.categoryId, true, res);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })

    this.topRatedService.removeCheckout.subscribe((res: any) => {
    },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })
    this.topRatedService.seeCart.subscribe((res: any) => {
      if (res) {
        if (this.categoryId) {
          this.getCategory(this.categoryId, true);
        } else if (this.paramBrandId) {
          this.getBrand(this.paramBrandId, true);
        }
      }
    },
      err => {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      })

  }

  ngOnInit(): void {
    // this.spinner.show();
    this.route.queryParams.subscribe(params => {
      if (params.brandId) {
        this.brandorder = 'brand'
        this.getBrand(params.brandId);
        this.paramBrandId = params.brandId
      }
      if (params.categoryId) {
        this.brandorder = 'category'
        this.categoryId = params.categoryId;
        this.getCategory(params.categoryId);
        this.productcate = params.categoryId
      }
      if (params.searchKey) {
        this.brandorder = 'search';
        this.searchKey = params.searchKey;
        this.search();
      }
    });
    this.priceForm = this.formBuilder.group({
      searchKey: [this.searchKey],
      maxPrice: [null],
      minPrice: [null],
      brandId: [this.paramBrandId],
      categoryId: [this.categoryId]
    })

    this.ratingForm = this.formBuilder.group({
      searchKey: [this.searchKey],
      ratingList: [this.cateArr.name],
      brandId: [this.productbrand],
      categoryId: [this.categoryId]
    })
  }
  get f() { return this.priceForm.controls }


  // priceFilter() {
  //   this.spinner.show();
  //   this.cateArr = [];
  //   this.productBrand = [];
  //   this.topRatedService.searchProduct(this.priceForm.value).pipe(first()).subscribe(res => {
  //     this.productArr = res.data;
  //     this.spinner.hide();
  //     this.toastr.success(res.message);
  //     this.updateCartInfo();
  //     this.priceForm.reset({});
  //   }, err => {
  //     this.spinner.hide();
  //     this.toastr.error(err.error.error.reason);
  //   })
  // }
  getSearchBrand(id: any) {
    this.topRatedService.filterProduct({ searchKey: id }).pipe(first()).subscribe(res => {
      this.filterArr = res.data.brandList;
      this.filterCategory = res.data.productCategoryList;
      this.ratingCategoryArr = res.data.ratingList;

    })
  }


  getCategoryProducts(id: any, event: any) {
    this.spinner.show();
    const checked = event.target.checked; // stored checked value true or false
    if (checked) {
      this.selectedCategoryId.push(id);
    } else {
      this.selectedCategoryId.splice(id, 1);
    }
    this.cateProductArr = [];
    let payload = {};
    if (this.searchKey) {
      payload = {
        categoryList: this.selectedCategoryId,
        searchKey: this.searchKey,
        brandList: this.selectedBrandId,
        ratingList: this.selectedRatingId,
      }
    } else {
      payload = {
       categoryList: this.selectedCategoryId,
        brandId: this.paramBrandId,
        ratingList: this.selectedRatingId,
      }
    }
    this.topRatedService.searchProduct(payload).pipe(first()).subscribe(res => {
      this.productArr = res.data;
      this.spinner.hide()
      // this.toastr.success(res.message);
      this.updateCartInfo();
    }, err => {
      this.spinner.hide();
      // this.toastr.error(err.error.error.reason);
    }
    )
  }

  filterRating(id: any, event: any) {
    this.spinner.show();
    const checked = event.target.checked; // stored checked value true or false

    if (checked) {
      this.selectedRatingId.push(id);
    } else {
      const index = this.selectedRatingId.findIndex((data: any) => data === id);
      this.selectedRatingId.splice(index, 1);
    }
    this.cateArr = [];
    let rating = {};
    if (this.searchKey) {
      rating = {
        ratingList: this.selectedRatingId,
        searchKey: this.searchKey,
        categoryList: this.selectedCategoryId,
        brandList: this.selectedBrandId
      }
    } else if (this.categoryId) {
      rating = {
        ratingList: this.selectedRatingId,
        categoryId: this.categoryId,
        brandList: this.selectedBrandId,
      }

    } else if (this.paramBrandId) {
      rating = {
        ratingList: this.selectedRatingId,
        brandId: this.paramBrandId,
        categoryList: this.selectedCategoryId,
      }
    }

    this.topRatedService.searchProduct(rating).pipe(first()).subscribe(res => {
      this.productArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
      // this.updateCartInfo();
    }, err => {
      this.spinner.hide();
      // this.toastr.error(err.error.error.reason);
    })
  }
  priceFilter() {
    let price = {}
    if (this.searchKey) {
      price = {
        maxPrice: this.priceForm.value.maxPrice,
        minPrice: this.priceForm.value.minPrice,
        searchKey: this.searchKey,
        brandList: this.selectedBrandId,
        ratingList: this.selectedRatingId,
        categoryList: this.selectedCategoryId,
      }
    } else if (this.categoryId) {
      price = {
        maxPrice: this.priceForm.value.maxPrice,
        minPrice: this.priceForm.value.minPrice,
        categoryId: this.categoryId,
        brandList: this.selectedBrandId,
        ratingList: this.selectedRatingId,
      }

    } else if (this.paramBrandId) {
      price = {
        maxPrice: this.priceForm.value.maxPrice,
        minPrice: this.priceForm.value.minPrice,
        brandId: this.paramBrandId,
        ratingList: this.selectedRatingId,
        categoryList: this.selectedCategoryId,

      }
    }

    this.topRatedService.searchProduct(price).pipe(first()).subscribe(res => {
      this.productArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
      this.updateCartInfo();
      // this.priceForm.reset({});
    }, err => {
      this.spinner.hide();
      // this.toastr.error(err.error.error.reason);
    })
  }

  getBrandProducts(id: any, event: any) {
    this.spinner.show();
    const checked = event.target.checked; // stored checked value true or false

    if (checked) {
      this.selectedBrandId.push(id);
    } else {
      this.selectedBrandId.splice(id, 1);
    }
    this.cateArr = [];
    let payload = {};
    if (this.searchKey) {
      payload = {
        brandList: this.selectedBrandId,
        searchKey: this.searchKey,
        categoryList: this.selectedCategoryId,
        ratingList: this.selectedRatingId,
      }
    } else {
      payload = {
        brandList: this.selectedBrandId,
        ratingList: this.selectedRatingId,
        categoryId: this.categoryId,
      }
    }
    this.topRatedService.searchProduct(payload).pipe(first()).subscribe(res => {
      this.productArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
      this.updateCartInfo();
    },
      err => {
        this.spinner.hide();
        // this.toastr.error(err.error.error.reason);
      })
  }

  getCategory(id: any, onLoad = false, deletedItem?: any) {
    if (!onLoad) {
      this.topRatedService.filterProduct({ categoryId: id }).pipe(first()).subscribe(res => {
        this.filterBrandArr = res.data.brandList;
        this.ratingCategoryArr = res.data.ratingList;
        this.singleCategory = res.data.productCategoryList[0];
        // this.toastr.success(res.data.message);
      },
        err => {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        })

      this.topRatedService.searchProduct({ categoryId: id }).pipe(first()).subscribe(res => {
        this.productArr = res.data;
        this.spinner.hide();
        // this.toastr.success(res.message);
       this.updateCartInfo();
      },
        err => {
          this.spinner.hide();
          // this.toastr.error(err.error.error.reason);
        })
    } else {
      this.updateCartInfo(deletedItem);
    }
  }

  addToCart(obj: any) {
    for (let list of this.productArr) {
      if (list.productDtlId == obj.productDtlId) {
        list.productId = list.productDtlId;
        list.orderQty = 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }

  decreaseQuantity(obj: any) {
    for (let list of this.productArr) {
      if (list.productDtlId == obj.productDtlId) {
        list.productId = list.productDtlId;
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
    for (let list of this.productArr) {
      if (list.productDtlId == obj.productDtlId) {
        list.productId = list.productDtlId;
        list.orderQty = list.orderQty + 1;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getCart(list);
      }
    }
  }

  getBrand(id: any, onLoad = false) {
    this.spinner.show();
    if (!onLoad) {
      this.topRatedService.filterProduct({ brandId: id }).pipe(first()).subscribe(res => {
        this.filterCategoryArr = res.data.productCategoryList;
        this.ratingCategoryArr = res.data.ratingList;
        this.singleBrand =res.data.brandList[0];
        // this.toastr.success(res.message);
        this.spinner.hide();
      },
        err => {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        })
      this.topRatedService.searchProduct({ brandId: id }).pipe(first()).subscribe(res => {
        this.productArr = res.data;
        // this.toastr.success(res.message);
        this.spinner.hide();
        this.updateCartInfo();
      });
    } else {
      this.spinner.hide();
      this.updateCartInfo();
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


  // onFav(listObj: any, isFav = false) {
  //   this.priceForm.patchValue({
  //     productId: listObj.productDtlId,
  //     favorite: true
  //   })
  //   if (isFav) {
  //     this.favService.createFav(this.priceForm.value).pipe(first()).subscribe(res => {
  //       this.favService.showFav();
  //       // this.toastr.success(res.data.message);
  //     },
  //       err => {
  //         this.spinner.hide();
  //         this.toastr.error(err.error.error.reason);
  //       }
  //     )
  //     this.faverbtn = false;
  //     this.favcolourbtn = true;
  //   } else {

  //     this.favService.deleteFav(listObj.id).pipe(first()).subscribe(res => {

  //       this.faverbtn = true;
  //       this.favcolourbtn = false;
  //       this.favService.showFav();
  //       // this.toastr.success(res.data.message);
  //     },
  //       err => {
  //         this.spinner.hide();
  //         this.toastr.error(err.error.error.reason);
  //       })
  //   }
  // }
  search() {
    this.spinner.show();
    this.topRatedService.searchProduct({ searchKey: this.searchKey }).pipe(first()).subscribe(res => {
      this.productArr = res.data;
      this.spinner.hide();
      this.updateCartInfo();
      this.getSearchBrand(this.searchKey);
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        // this.toastr.error(err.error.error.reason);
      })
  }

  updateCartInfo(deletedItem?: any) {
    const localData = JSON.parse(localStorage.getItem('cartData')!);
    if (deletedItem) {
      let index = this.productArr.findIndex((data: any) => data.productDtlId == deletedItem)
      this.productArr[index].orderQty = null;
    }

    if (localData) {
      for (let i = 0; i <= this.productArr.length; i++) {
        const cart = localData.find((data: any) => data?.productDtlId === this.productArr[i]?.productDtlId);
        if (cart) {
          this.productArr[i].orderQty = cart.orderQty;
        }
      }
    }
  }
  // removeFilter(){

  // }
}
