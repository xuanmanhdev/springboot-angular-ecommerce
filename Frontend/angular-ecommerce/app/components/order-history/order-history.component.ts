import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: any[] = [];
  storage: Storage = localStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {

    // read the user's email address from browser storage
    // const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    const theUSerId = +this.storage.getItem('userId')!;
    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theUSerId).subscribe(
      data => {
        this.orderHistoryList = data;
      }
    );

    console.log(this.orderHistoryList);
  }

}
