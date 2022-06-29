import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { CheckoutService } from '../checkout/checkout.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
declare let $: any;

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderArr: any = [];
  statusArr: any = [];
  status: any;
  confirmedButton = false;
  shippedButton = false;
  deliveredButton = false;
  progressButton = false;
  allOrdersButton = false;
  selectedAttributes: any
  orderHistory:string="0";

  reviewForm: FormGroup;
  showReviewButton = false;
  currentRate = 0;
  id: any;
  data: any = {};
  reviewSubmitted = false;
  buttonText: string = "";
  selectedValue: any;
  stars: number[] = [1, 2, 3, 4, 5];
  order = [
    {
      id: '0',
      value: 'All orders',
      status: 'ALLORDERS'
    },
    {
      id: '1',
      value: 'Confirmed',
      status: 'CONFIRMED'
    },
    {
      id: '2',
      value: 'Progress',
      status: 'PROGRESS'
    },
    {
      id: '3',
      value: 'Shipped',
      status: 'SHIPPED'
    },
    {
      id: '4',
      value: 'Delivered',
      status: 'DELIVERED'
    },
  ]




  constructor(
    private checkoutService: CheckoutService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getOrderStatus('ALLORDERS');

    this.reviewForm = this.formBuilder.group({
      noOfStars: [null,[Validators.pattern("[0-5]"),
      Validators.minLength(10000000000), Validators.maxLength(555555555555)]],
      // notes: [null],
      // reviews: [null],
    })
  }

  getOrderStatus(status:any) {
   this.checkoutService.orderHistory(status).pipe(first()).subscribe(res => {
      this.statusArr = [];
      this.orderArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
    }, err => {
      this.spinner.hide();
      // this.toastr.error(err.error.error.reason);
    })
  }
  visibleIndex = -1;
  showSubItem(i: any) {
    if (this.visibleIndex === i) {
      this.visibleIndex = -1;

    } else {

      this.visibleIndex = i;

    }
  }
  // closeReviewModal() {
  //   $('#reviewModal').modal('hide');
  //   this.reviewSubmitted = false;
  //   this.reviewForm.reset({});

  // }
  openReviewModal(reviewModal: any) {

    this.buttonText = "Submit";
    this.reviewForm.reset({});
    this.reviewSubmitted = false;
    $('#reviewModal').modal('show');
    this.modalService.open(reviewModal, { size: 'sm'})
  }

  countStar(star:any) {
    this.selectedValue = star;
    this.reviewForm.patchValue({
      noOfStars:star
    })

}

  reviewCompleted() {
    this.reviewSubmitted = true;
    if(this.reviewForm.invalid){
      return;
    }

    // this.spinner.show();
    // this._orderStatusService.giveOrderReview(this.id,this.reviewForm.value).pipe(first()).subscribe((data: any) => {
    //   $('#reviewModal').modal('hide');
    //   this.getOrderStatus("COMPLETED");
    //   // this.spinner.hide();
    //   this.toastr.success(data.data, 'Success!');
    // }, err => {
    //   if (err.error.error.reason) {
    //     this.toastr.error(err.error.error.reason);
    //   }
    //   this.spinner.hide();
    // })
  }
  getRating(event:any){
    console.log(event.target.value);
    this.currentRate = event.target.value;
  }
  get p() { return this.reviewForm.controls };

}
