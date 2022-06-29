import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ProductsComponent } from './products/products.component';
import { AllCategoryComponent } from './all-category/all-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CompareListComponent } from './compare-list/compare-list.component';
import { OfferComponent } from './offer/offer.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BlogGridComponent } from './Blogs/blog-grid/blog-grid.component';
import { BlogStandardComponent } from './Blogs/blog-standard/blog-standard.component';
import { BlogDetailsComponent } from './Blogs/blog-details/blog-details.component';
import { BlogAuthorComponent } from './Blogs/blog-author/blog-author.component';
import { BrandListComponent } from './other-pages/brand-list/brand-list.component';
import { BrandSingleComponent } from './other-pages/brand-single/brand-single.component';
import { Shop5ColumnComponent } from './shop/shop5-column/shop5-column.component';
import { Shop4ColummComponent } from './shop/shop4-columm/shop4-columm.component';
import { Shop3ColummComponent } from './shop/shop3-columm/shop3-columm.component';
import { Shop2ColummComponent } from './shop/shop2-columm/shop2-columm.component';
import { Shop1ColummComponent } from './shop/shop1-columm/shop1-columm.component';
import { OrderInvoiceComponent } from './user action/order-invoice/order-invoice.component';
import { CheckoutComponent } from './user action/checkout/checkout.component';
import { OrderHistoryComponent } from './user action/order-history/order-history.component';
import { ErrorComponent } from './pages/error/error.component';
import { BlangPageComponent } from './pages/blang-page/blang-page.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EmailTemplateComponent } from './pages/email-template/email-template.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import {  NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule, NgbAccordionModule, } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductSingleGridComponent } from './shop-product- pages/product-single-grid/product-single-grid.component';
import { ProductSingleSimpleComponent } from './shop-product- pages/product-single-simple/product-single-simple.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { FavouriteComponent } from './favourite/favourite.component';
// import { ProductSingleTabComponent } from './shop-product- pages/product-single-tab/product-single-tab.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SingleProductComponent } from './shop-product- pages/single-product/single-product.component';
// import {  MaterialModule,} from '@angular/material';

@NgModule({
  declarations: [
    ProductsComponent,
    AllCategoryComponent,
    ProductListComponent,
    CompareListComponent,
    OfferComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    BlogGridComponent,
    BlogStandardComponent,
    BlogDetailsComponent,
    BlogAuthorComponent,
    BrandListComponent,
    BrandSingleComponent,
    Shop5ColumnComponent,
    Shop4ColummComponent,
    Shop3ColummComponent,
    Shop2ColummComponent,
    Shop1ColummComponent,
    OrderInvoiceComponent,
    // CompareComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    ErrorComponent,
    BlangPageComponent,
    CommingSoonComponent,
    PrivacyPolicyComponent,
    MyProfileComponent,
    EmailTemplateComponent,
    VerificationComponent,
    ProductSingleGridComponent,
    // ProductSingleSimpleComponent,
    FaqComponent,
    AboutUsComponent,
    MyWalletComponent,
    FavouriteComponent,
    SingleProductComponent,
   
  ],
  imports: [CommonModule, PagesRoutingModule,  ReactiveFormsModule,
    NgOtpInputModule,
    GooglePlaceModule,
    NgSelectModule,  
    NgbModule,
    NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule, NgbAccordionModule,
    FormsModule,
  ClipboardModule,
  NgxSpinnerModule],
})
export class PagesModule {}
