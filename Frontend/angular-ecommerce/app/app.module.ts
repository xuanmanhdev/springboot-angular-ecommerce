import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {authGuard} from "./services/auth/auth.guard";
import { CustomerListComponent } from './dashbroad/customer-manage/customer-list/customer-list.component';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './dashbroad/customer-manage/customer-detail/customer-detail.component';
import { UpdateCustomerComponent } from './dashbroad/customer-manage/update-customer/update-customer.component';
import { UpdateProductCategoryComponent } from './dashbroad/productCategoryManage/update-product-category/update-product-category.component';
import { OrderListComponent } from './dashbroad/order-manage/order-list/order-list.component';
import { UpdateProductComponent } from './dashbroad/productManage/update-product/update-product.component';
import { ProductCategoryListComponent } from './dashbroad/productCategoryManage/product-category-list/product-category-list.component';
import { OrderDetailComponent } from './dashbroad/order-manage/order-detail/order-detail.component';
import { AdminMenuManageComponent } from './dashbroad/admin-menu-manage/admin-menu-manage.component';
import { AdminProductListComponent } from './dashbroad/productManage/admin-product-list/admin-product-list.component';
import { ProductDetailComponent } from './dashbroad/productManage/product-detail/product-detail.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { RevenueStatisticsComponent } from './dashbroad/revenue-statistics/revenue-statistics.component';

import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'order-history', component: OrderHistoryComponent},

  {path: 'revenue', component: RevenueStatisticsComponent},

  {path: 'customer-list', component: CustomerListComponent},
  {path: 'customer-detail/:id', component: CustomerDetailComponent},
  {path: 'create-customer', component: UpdateCustomerComponent},
  {path: 'update-customer/:id', component: UpdateCustomerComponent},

  {path: 'product-list', component: AdminProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'create-product', component: UpdateProductComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},


  {path: 'product-category-list', component: ProductCategoryListComponent},
  {path: 'product-category-detail/:id', component: ProductDetailsComponent},
  {path: 'create-product-category', component: UpdateProductCategoryComponent},
  {path: 'update-product-category/:id', component: UpdateProductCategoryComponent},


  {path: 'order-list', component: OrderListComponent},
  {path: 'order-detail/:id', component: OrderDetailComponent},






  // {path: 'admin', loadChildren:() => import('./dashbroad/dashbroad.module').then(m => m.DashbroadModule)},
  // {path: '/admin/customer-list', component: CustomerListComponent, canActivate: [authGuard]},
  {path: 'welcomeTest', component: WelcomeComponent},
  {path: 'welcome', component: WelcomeComponent, canActivate: [authGuard]},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    CustomerListComponent,
    CartDetailsComponent,
    UpdateCustomerComponent,
    CustomerDetailComponent,
    UpdateProductCategoryComponent,
    OrderListComponent,
    AdminMenuManageComponent,
    ProductCategoryListComponent,
    OrderDetailComponent,
    AdminProductListComponent,
    UpdateProductComponent,
    ProductDetailComponent,
    OrderHistoryComponent,
    RevenueStatisticsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MdbCarouselModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
