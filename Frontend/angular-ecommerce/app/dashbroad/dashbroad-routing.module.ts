import { RouterModule, Routes } from "@angular/router";
import { CustomerListComponent } from "./customer-manage/customer-list/customer-list.component";
import { CustomerDetailComponent } from "./customer-manage/customer-detail/customer-detail.component";
import { NgModule } from "@angular/core";
import { UpdateCustomerComponent } from "./customer-manage/update-customer/update-customer.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes: Routes = [

  // {path: 'customer-list', component: CustomerListComponent},
  // {path: 'customer-detail/:id', component: CustomerDetailComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbroadRoutingModule { }
