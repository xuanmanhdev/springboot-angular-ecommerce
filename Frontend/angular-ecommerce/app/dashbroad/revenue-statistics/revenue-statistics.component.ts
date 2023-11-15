import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RevenueStatisticsService } from 'src/app/services/revenue-statistics.service';

@Component({
  selector: 'app-revenue-statistics',
  templateUrl: './revenue-statistics.component.html',
  styleUrls: ['./revenue-statistics.component.scss']
})
export class RevenueStatisticsComponent implements OnInit {
  revenueData: any;
  startDate!: string;
  endDate!: string;

  constructor(private revenueService: RevenueStatisticsService) {}

  ngOnInit() {
  }

  calculateRevenue(){
    this.revenueService.getRevenueByTimes(this.startDate, this.endDate)
    .subscribe((data) => {
      this.revenueData = data;
    });
  }
}
