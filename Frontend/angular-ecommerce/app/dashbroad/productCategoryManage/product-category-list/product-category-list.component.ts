import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_ACTIVE_PAGE, DEFAULT_PAGE_SIZE } from 'src/app/common/const';
import { ProductCategory } from 'src/app/common/product-category';
import { SortOption } from 'src/app/common/sort-option';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit{
  productCategories: ProductCategory[] = [];

  dataList: any[] = [];
  queryParams: any = {
    page: DEFAULT_ACTIVE_PAGE,
    size: DEFAULT_PAGE_SIZE
  }
  totalElements: number = 0;
  isLoadingData: boolean = true;
  sortColumn: SortOption[] = [];


  constructor(private productCategoryService: ProductCategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams.page = +params['page'] || DEFAULT_ACTIVE_PAGE; // Lấy ?page={page}
      this.queryParams.size = +params['size'] || DEFAULT_PAGE_SIZE; // Lấy &size={size}
      this.loadProductCategoryData();
    });
  }

  reloadPage() {
    window.location.reload();
  }

  loadProductCategoryData() {
    this.isLoadingData = true;
    this.productCategoryService.getProductCategories(this.queryParams).subscribe(res => {
      if (res) {
        this.totalElements = res.totalElements; // Tổng số phần tử
        this.queryParams.size = res.size; // Số phần tử của 1 page
        this.dataList = res.content;
        this.isLoadingData = false;
      }
    });
  }

  deleteProductCategory(id: number){
    this.productCategoryService.deleteProductCategory(id).subscribe( data => {
      this.updateQueryParamAndLoadData();
    })
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
    this.router.navigate(['/product-category-list'], { queryParams: this.queryParams });
  }





}
