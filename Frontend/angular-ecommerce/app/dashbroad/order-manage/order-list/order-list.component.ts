import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderStatus } from 'src/app/enum/OrderStatus.enum';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: any[] = [];
  setStatusOrder!: OrderStatus[];
  orderStatus= Object.values(OrderStatus);

  constructor(private orderService: OrderHistoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
    this.setStatusOrder = new Array(this.orderList.length);
  }

  private getOrders(){
    this.orderService.getOrders().subscribe(data => {
      // console.log("Retrieved order: " + JSON.stringify(data));
      this.orderList = data;

    });
  }

  reloadPage() {
    window.location.reload();
  }

  orderDetails(id: number){
    this.router.navigate([`/order-detail/${id}`]);
  }


  setStatusForOrder(id: number, order: OrderHistory, orderChange: OrderStatus){
    order.status = orderChange;
    this.orderService.setStatusForOrder(id, order).subscribe(
      (response) => {
        console.log('Order updated successfully', response);
        // Handle success response from the API
      },
      (error) => {
        console.error('Error updated Order', error);
        // Handle error response from the API
      }
    );
  }

}

