import { Component, OnInit } from '@angular/core';
import { AllCategoryService } from './all-category.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TopRatedProductsService } from '../home/top-rated-products.service';



@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.scss'],
})
export class AllCategoryComponent implements OnInit {


  categoryId: any
  categoryArry: any = [];
  id: any;
  cateForm!: FormGroup
  categoryItem: any;
  arrResult: any = []

  constructor( private route: ActivatedRoute,
    private router: Router,
    private allCategoryService: AllCategoryService,

    private spinner:NgxSpinnerService, private toastr:ToastrService,
    private TopRatedProductsService: TopRatedProductsService, private formbuilder: FormBuilder) { }


  ngOnInit(): void {
    this.spinner.show();
    this.getAllCategories();
    this.cateForm = this.formbuilder.group({
      categoryId: [null],

    })

  }
  getAllCategories() {

    this.allCategoryService.getcategories().pipe(first()).subscribe(res => {
      this.categoryArry = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    })

  }
  category(id:any){
    this.router.navigate(['/products'],{queryParams:{categoryId:id}})
    
  }


}
