import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateCustomerComponent } from './customer-manage/update-customer/update-customer.component';
import { BrowserModule } from '@angular/platform-browser'
import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-manage/customer-list/customer-list.component';
import { authGuard } from '../services/auth/auth.guard';
import { CustomerDetailComponent } from './customer-manage/customer-detail/customer-detail.component';
import { OrderDetailComponent } from './order-manage/order-detail/order-detail.component';
import { OrderListComponent } from './order-manage/order-list/order-list.component';
import { AdminProductListComponent } from './productManage/admin-product-list/admin-product-list.component';
import { RevenueStatisticsComponent } from './revenue-statistics/revenue-statistics.component';

// const routes: Routes = [

//   {path: 'customer-list', component: CustomerListComponent},
//   {path: 'customer-detail/:id', component: CustomerDetailComponent},


// ];

@NgModule({
  declarations: [





  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ]
})
export class DashbroadModule { }
