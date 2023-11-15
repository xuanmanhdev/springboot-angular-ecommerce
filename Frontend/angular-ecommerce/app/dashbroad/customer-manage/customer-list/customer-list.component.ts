import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_ACTIVE_PAGE, DEFAULT_PAGE_SIZE } from 'src/app/common/const';
import { SortOption } from 'src/app/common/sort-option';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  dataList: any[] = [];
  queryParams: any = {
    page: DEFAULT_ACTIVE_PAGE,
    size: DEFAULT_PAGE_SIZE
  }
  totalElements: number = 0;
  sortColumn: SortOption[] = [];


  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams.page = +params['page'] || DEFAULT_ACTIVE_PAGE; // Lấy ?page={page}
      this.queryParams.size = +params['size'] || DEFAULT_PAGE_SIZE; // Lấy &size={size}
      this.loadCustomerData();
    });
  }

  reloadPage() {
    window.location.reload();
  }

  loadCustomerData() {
    this.customerService.getCustomers(this.queryParams).subscribe(res => {
      if (res) {
        this.totalElements = res.totalElements; // Tổng số phần tử
        this.queryParams.size = res.size; // Số phần tử của 1 page
        this.dataList = res.content;
      }
    });
  }

  pageChange(pageNumber: number) {
    this.queryParams.page = pageNumber;
    this.updateQueryParamAndLoadData();
  }

  search() {
    this.queryParams.page = DEFAULT_ACTIVE_PAGE;
    this.updateQueryParamAndLoadData();
  }

  sort(column: string) {
    const existingSort = this.sortColumn.find((item) => item.column === column);

    if (existingSort) {
      existingSort.direction = existingSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn.push({ column, direction: 'asc' });
    }

    // Remove sorting state for other columns
    this.sortColumn = this.sortColumn.filter((item) => item.column === column);

    // Apply sorting to queryParams.sort
    this.queryParams.sort = this.sortColumn.map((item) =>
      item.direction === 'desc' ? `-${item.column}` : item.column
    );

    this.queryParams.page = DEFAULT_ACTIVE_PAGE;
    this.updateQueryParamAndLoadData();
  }

  private updateQueryParamAndLoadData() {
    this.router.navigate(['/customer-list'], { queryParams: this.queryParams });
  }

  deleteCustomer(id: number){
        this.customerService.deleteCustomer(id).subscribe( data => {
      this.updateQueryParamAndLoadData();
    })
  }

}
