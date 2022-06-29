import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/pages/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { TopRatedProductsService } from 'src/app/pages/home/top-rated-products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FavouriteService } from 'src/app/pages/favourite/favourite.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/pages/pages/profile.service';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { NgxSpinnerService } from 'ngx-spinner';


declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = 'angular'

  SearchForm!: FormGroup
  categoryForm!: FormGroup
  sidebar: boolean = false;
  public loggedInUserName: string | undefined;
  currentUrl: any;
  orderReqArray: any = [];
  productListArr: any = [];
  previousUrl: any;
  array: any = [];
  calculateObj: any = {};
  searchObj: any = [];
  filterArr: any = [];
  listObj: any = {};
  favProductArr: any = [];
  public showCouponCode = false;
  id: any
  fileUrl: any
  searchkey: any

  constructor(
    public authService: AuthenticationService,
    public topRatedService: TopRatedProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public favService: FavouriteService,
    private toastr: ToastrService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
  ) {
    this.topRatedService.viewCart.subscribe((res: any) => {
      this.productListArr = JSON.parse(localStorage.getItem('cartData')!);
      this.calculation();

    },
      err => {

        this.toastr.error(err.error.error.reason);
      })
    this.topRatedService.removeCheckout.subscribe((res: any) => {
      this.productListArr = JSON.parse(localStorage.getItem('cartData')!);

      this.calculation();
    },
      err => {

        this.toastr.error(err.error.error.reason);
      })
    this.topRatedService.removeCart.subscribe((res: any) => {
      this.getCartData();
      this.calculation();
    },
      err => {

        this.toastr.error(err.error.error.reason);
      });
    this.favService.viewWishList.subscribe((res: any) => {
      this.getFav();
    },
      err => {

        this.toastr.error(err.error.error.reason);
      })
  }

  ngOnInit(): void {

    this.SearchForm = this.formBuilder.group({
      searchKey: [null],
    })

    this.productListArr = JSON.parse(localStorage.getItem('cartData')!);
    this.getCartData();
    // this.previousUrl=this.route.snapshot.params['previousUrl'];
    this.calculation();
    // this.getFav();
    // this.productsearch();
    this.getUserProfile();
    // this.getUserImage();
    // this.search();
  }


  logout() {
    this.authService.logout();
    this.getCartData();
    this.calculation();
  }
  getUserDetails() {
    this.authService.getUserDetails().pipe(first()).subscribe((res) => {
      // this.toastr.success(res.message);
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      if (res.data.loginObj.roleObj.roleName == 'ADMIN') {
        this.router.navigate([this.currentUrl]);
      } else {
        this.router.navigate([this.currentUrl]);

      }
    },
      err => {

        this.toastr.error(err.error.error.reason);
      }
    );
  }
  getCartData() {
    this.productListArr = this.topRatedService.getCartData();
  }
  getFav() {
    this.favService.getFav().pipe(first()).subscribe(res => {
      this.favProductArr = res.data
    },
      err => {

        this.toastr.error(err.error.error.reason);
      })

  }

  toCheckItsInLocal(cartObj: any) {
    let orderReqArray = this.topRatedService.getCartData();
    if (orderReqArray) {
      for (let i = 0; i < orderReqArray.length; i++) {
        if (cartObj.productId == orderReqArray[i].productId) {
          orderReqArray.splice(i, 1);
        }
      }
      localStorage.setItem('cartData', JSON.stringify(orderReqArray));
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
  calculation() {
    this.array = JSON.parse(localStorage.getItem('cartData')!);
    if (this.array) {
      let totalCost = 0;
      for (let i = 0; i < this.array.length; i++) {
        let orderQuantityAmount = this.array[i].orderQuantityAmount;
        totalCost = totalCost + orderQuantityAmount;
      }
      this.calculateObj.totalCost = totalCost;
    } else {
      this.calculateObj.totalCost = "0.00";
    }
  }

  decreaseQuantity(obj: any) {
    for (let list of this.productListArr) {
      if (list.id == obj.id) {
        if (list.orderQty > 1) {
          list.orderQty = list.orderQty - 1;
          // this.listObj.orderQty = list.orderQty;
          list.orderQuantityAmount = (list.orderQty * list.price);
          this.toCheckItsInLocal(list);
          this.topRatedService.getData(list);
          this.calculation();
        }
      }
    }
  }

  increaseQuantity(obj: any) {
    for (let list of this.productListArr) {
      if (list.id == obj.id) {
        list.orderQty = list.orderQty + 1;
        // this.listObj.orderQty = list.orderQty;
        list.orderQuantityAmount = (list.orderQty * list.price);
        this.toCheckItsInLocal(list);
        this.topRatedService.getData(list);
        this.calculation();

      }
    }
  }
  removeFromCart(productId: any , productDtlId:any) {
    // const cateArr = JSON.parse(localStorage.getItem('cateArr')!);
    // const foundIndex = cateArr.findIndex((data: any) => data.id == productId);
    // cateArr[foundIndex].orderQty = null;
    // localStorage.setItem('cateArr', JSON.stringify(cateArr));
    for (var i = 0; i < this.productListArr.length; i++) {
      if (this.productListArr[i].productId == productId) {
        this.productListArr.splice(i, 1);
        break;

      }
    }
    localStorage.setItem('cartData', JSON.stringify(this.productListArr));
    this.getCartData();
    this.calculation();
    this.topRatedService.getRemove(productDtlId);
    // this.toastr.success('Item removed successfully.!', 'Success!');

  }

  preventScroll() {
    if (this.sidebar) {
      $('body').css('overflow', 'hidden')
    } else {
      $('body').css('overflow', 'inherit')
    }
  }

  filter() {
    this.topRatedService.filterProduct(this.SearchForm.value).pipe(first()).subscribe(res => {
      this.filterArr = res.data;
      this.toastr.success(res.data);
    },
      err => {

        this.toastr.error(err.error.error.reason);
      })
  }
  getUserProfile() {
    this.profileService.getUserProfile().pipe(first()).subscribe(res => {
      //  this.toastr.success(res.data);
      this.fileUrl = res.data.fileUrl;
      localStorage.setItem('login', JSON.stringify(res.data));
      // this.toastr.success(res.message);
    },
      // err => {
      //   this.toastr.error(err.error.error.reason);
      //   this.spinner.hide();
      // }
      )
  }
  // getUserImage(){
  //   this.profileService.getUserProfile().pipe(first()).subscribe(res =>{
  //     localStorage.setItem('login',JSON.stringify(res.data));
  //   })
  //     }

  search() {
    // this.router.navigate(['/products/{{searchObj.searchKey}}'])
    this.router.navigate(['/products'], { queryParams: { searchKey: this.SearchForm.get('searchKey')?.value } })
    this.SearchForm.reset({});
    //   this.topRatedService.searchProduct(this.SearchForm.value).pipe(first()).subscribe(res => {
    //     this.searchObj = res.data;
    //     this.topRatedService.getSearch(res.data)
    //     this.toastr.success(res.data);
    //     this.getSearchBrand();
    //   this.router.navigate(['/products/{{searchObj.searchKey}}'])
    // },
    // err => {

    //   this.toastr.error(err.error.error.reason);
    //   this.spinner.hide();

    //     // this.router.navigate(['/products/{searchKey:id}'])
    //   })
  }
  getSearchBrand() {
    this.topRatedService.filterProduct(this.SearchForm.value).pipe(first()).subscribe(res => {
      this.filterArr = res.data;
      this.topRatedService.getFilter(res.data);
    })
  }

}
