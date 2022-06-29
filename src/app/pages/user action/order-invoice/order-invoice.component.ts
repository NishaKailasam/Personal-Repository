import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CheckoutService } from '../checkout/checkout.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../pages/profile.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  orderArr: any = [];
  orderId: any;
  orderObj:any={};
  orderNo:any;
  orderPlacedDate:any;
  grandTotal:any;
  paymentMode:any;
  deliveryObj:any;
  addressObj:any={};
  customerOrderItemsDTOList:any=[];

  constructor(
  public checkoutService: CheckoutService,
  public profileService:ProfileService,
  private router:Router,
  private route:ActivatedRoute,
  private toastr:ToastrService,
  private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.orderId = this.route.snapshot.params['id'];
     this.orderInvoice();

  }
  orderInvoice() {
    this.checkoutService.singleOrder(this.orderId).pipe(first()).subscribe(res => {
      this.orderObj = res.data;
      this.deliveryObj = res.data.deliveryAddressDtoObj;
      this.customerOrderItemsDTOList = res.data.customerOrderItemsDTOList;
      this.spinner.hide();
      // this.toastr.success(res.message);
      // this.orderNo = this.orderObj.orderNo;
      // this.orderPlacedDate = this.orderObj.orderPlacedDate;
      // this.grandTotal = this.orderObj.grandTotal;
      // this.paymentMode = this.orderObj.paymentMode;
    },
    err => {
    //  this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
  }
getOrderDetails(){
  this.checkoutService.singleOrder(this.orderObj.customerOrderId).pipe(first()).subscribe(res =>{
    this.orderObj=res.data;
    // this.toastr.success(res.message);
  },
  err => {

    this.toastr.error(err.error.error.reason);
  })
}
}
