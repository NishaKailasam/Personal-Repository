import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategoryComponent } from './all-category/all-category.component';
import { CompareListComponent } from './compare-list/compare-list.component';
import { ContactComponent } from './contact/contact.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
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
import { VerificationComponent } from './verification/verification.component';
// import { ProductSingleTabComponent } from './shop-product- pages/product-single-tab/product-single-tab.component';
import { ProductSingleGridComponent } from './shop-product- pages/product-single-grid/product-single-grid.component';
import { ProductSingleSimpleComponent } from './shop-product- pages/product-single-simple/product-single-simple.component';
import { FaqComponent } from './pages/faq/faq.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { SingleCategoriesComponent } from './single-categories/single-categories.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SingleProductComponent } from './shop-product- pages/single-product/single-product.component';
const routes: Routes = [

  {path: 'home', component: HomeComponent},


  {path: '', redirectTo: "home", pathMatch:"full"},

  // {path: '404', component: ErrorComponent},

//  {path: '**', redirectTo: '/404'},

  {path: 'all-category', component: AllCategoryComponent},

  { path: 'single-categories/:id', component: SingleCategoriesComponent },

  {path: 'offer', component: OfferComponent},

  {path: 'product/list', component: ProductListComponent},

  {path:'fav',component:FavouriteComponent},

   {path: 'compareList', component:CompareListComponent },

  {path:'checkout',component:CheckoutComponent},

  {path:'order-history',component:OrderHistoryComponent},

  {path:'order/:id',component:OrderInvoiceComponent},

  {path: 'product/list/product', component: ProductsComponent},

  {path: 'contact', component: ContactComponent},

  {path: 'login', component: LoginComponent},

  {path: 'signup', component: SignupComponent},

  {path: 'verification' , component: VerificationComponent},

  {path: 'verification/:previousUrl' , component: VerificationComponent},

  {path: 'reset-password', component: ResetPasswordComponent},

  {path: 'change-password', component: ChangePasswordComponent},

  {path: 'blog-grid', component:BlogGridComponent},

  {path: 'blog-standard',component:BlogStandardComponent},

  {path: 'blog-details',component:BlogDetailsComponent},

  {path: 'blog-author',component:BlogAuthorComponent},

  {path: 'brands', component: BrandListComponent},

  {path: 'brands/:id', component: BrandSingleComponent},

  {path: 'shop/shop-5', component: Shop5ColumnComponent},

  {path: 'products', component:ProductsComponent},
  {path: 'products/:id', component:ProductsComponent},


  // {path: 'shop/shop-3', component:Shop3ColummComponent},

  {path: 'shop/shop-2', component:Shop2ColummComponent},

  {path: 'shop/shop-1', component:Shop1ColummComponent},

  // {path: 'error', component:ErrorComponent},

  {path: 'BlangPage', component:BlangPageComponent},

 {path: 'comming-soon', component:CommingSoonComponent},

 {path: 'privacy', component:PrivacyPolicyComponent},

 {path: 'profile', component:MyProfileComponent},

 {path: 'email-template', component:EmailTemplateComponent},

//  {path: 'product/products/:id', component: ProductSingleTabComponent},
 {path: 'product/products/:id',component:SingleProductComponent},

 {path: 'product-single-grid', component: ProductSingleGridComponent},

 {path: 'product-single-simple', component:ProductSingleSimpleComponent},

 {path: 'faq', component:FaqComponent},

 {path: 'about' , component:AboutUsComponent},
 {path: 'wallet', component:MyWalletComponent},

 { path: '**', pathMatch: 'full', 
        component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
