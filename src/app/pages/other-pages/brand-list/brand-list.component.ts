import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BrandService } from '../brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  brandForm!: FormGroup
  brandListArr: any = [];
  singleBrandObj: any = {};

  constructor(
    private brandService: BrandService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }
  branded: any = [];
  id: any;
  brandItem: any;
  brandResult: any = [];



  ngOnInit(): void {
    this.spinner.show();
    this.getBrandList();

  }

  getBrandList() {
    this.brandService.getBrandList().pipe(first()).subscribe(res => {
      this.brandListArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })
    }
    brand(id:any){
      this.router.navigate(['/products'],{queryParams:{brandId:id}})
  
    }

}
