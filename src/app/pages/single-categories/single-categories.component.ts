import { Component, OnInit } from '@angular/core';
import { AllCategoryService } from '../all-category/all-category.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-single-categories',
  templateUrl: './single-categories.component.html',
  styleUrls: ['./single-categories.component.scss']
})
export class SingleCategoriesComponent implements OnInit {
  id:any;
  productCategoriesArry :any =[];
  categoryId :any;
  constructor(private allCategoryService : AllCategoryService ,
      private route: ActivatedRoute,
      private toastr: ToastrService,
    private router: Router,) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getAllCategoriesByID();
    }
  }


  getAllCategoriesByID(){

    this.allCategoryService.getcategoriesGetById(this.id).pipe(first()).subscribe(res =>{
      this.productCategoriesArry = res.data
      // this.toastr.success(res.data);
    })

  }

}
