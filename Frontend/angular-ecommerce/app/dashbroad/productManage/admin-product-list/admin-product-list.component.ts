import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_ACTIVE_PAGE, DEFAULT_PAGE_SIZE } from 'src/app/common/const';
import { SortOption } from 'src/app/common/sort-option';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {

  dataList: any[] = [];
  queryParams: any = {
    page: DEFAULT_ACTIVE_PAGE,
    size: DEFAULT_PAGE_SIZE
  }
  totalElements: number = 0;
  isLoadingData: boolean = true;
  sortColumn: SortOption[] = [];



  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private httpClient: HttpClient
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams.page = +params['page'] || DEFAULT_ACTIVE_PAGE; // Lấy ?page={page}
      this.queryParams.size = +params['size'] || DEFAULT_PAGE_SIZE; // Lấy &size={size}
      this.loadProductData();
    });
  }

  reloadPage() {
    window.location.reload();
  }

  loadProductData() {
    this.isLoadingData = true;
    this.productService.getProductss(this.queryParams).subscribe(res => {
      if (res) {
        this.totalElements = res.totalElements; // Tổng số phần tử
        this.queryParams.size = res.size; // Số phần tử của 1 page
        this.dataList = res.content;
        this.isLoadingData = false;
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
    this.router.navigate(['/product-list'], { queryParams: this.queryParams });
  }


  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe( data => {
      this.updateQueryParamAndLoadData();
    })
  }



}

