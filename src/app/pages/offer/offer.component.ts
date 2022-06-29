import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { OffersService } from './offers.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})

export class OfferComponent implements OnInit {
  offerArr: any = [];
  buttonText = "copy";
  offer: any = {};
  toggle = true;
  toggleButton = 'copy';
  offerIndex: any;



  constructor(
    private offerService: OffersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { } 

  ngOnInit(): void {
    this.spinner.show();

    this.getOffer();
  }

  getOffer() {

    this.offerService.getOffer().pipe(first()).subscribe(res => {
      this.offerArr = res.data;
      this.offer = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message)
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    });
  }
  changeText(offerIndex: any) {

    this.offerIndex = offerIndex;
    this.toggleButton = 'copied!';

  }
}
