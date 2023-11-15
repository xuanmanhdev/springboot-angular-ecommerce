import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderInformation } from 'src/app/common/order-information';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  id!: number;
  order: any;
  orderItems: any[] = [];
  customer: any;
  address: any;



  constructor(private route: ActivatedRoute, private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.orderHistoryService.getOrderById(this.id).subscribe( data => {
      this.order = data.orderDto;
      this.customer = data.customerDto;
      this.address = data.addressDto;
      this.orderItems = data.orderItemDtoList;
    });
  }

}

