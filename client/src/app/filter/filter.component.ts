import { Component } from '@angular/core';
import { Category } from '../interfaces/categories';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/products';
import { ProductsService } from '../core/services/products.service';
import { Observable } from 'rxjs';
import { CategoriesService } from '../core/services/categories.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  public categoriesResults$!: Observable<Category[]>;
  filters = {
    text: 'Mobil',
    price: 0,
    category_id: '',
  };
  sendFilters = {
    name: '',
    category_id: 0,
    price: 0,
  };
  filteredProducts: Product[] = [];
  showFilterBoxName = true;
  showFilterBoxPriceCategory = true;
  constructor(
    private productsService: ProductsService,
    private serviceCategories: CategoriesService
  ) {}

  toggleFilterBoxName(event: MouseEvent) {
    event.stopPropagation();
    this.showFilterBoxName = !this.showFilterBoxName;
  }

  toggleFilterBoxPriceCategory(event: MouseEvent) {
    event.stopPropagation();
    this.showFilterBoxPriceCategory = !this.showFilterBoxPriceCategory;
  }
  applyFilters(type: string, text: string | any) {
    if (type === 'name') {
      this.sendFilters.name = text || this.filters.text;
      this.productsService.getFilteredProducts(this.sendFilters);
    } else if (type === 'category') {
      this.sendFilters.category_id =
        parseInt(text) || parseInt(this.filters.category_id);
      this.productsService.getFilteredProducts(this.sendFilters);
    }
    if (text instanceof Event) {
      const range = text.target as HTMLInputElement;
      this.sendFilters.price = parseInt(range.value) || this.filters.price;
      this.productsService.getFilteredProducts(this.sendFilters);
    }
  }
  ngOnInit(): void {
    this.categoriesResults$ = this.serviceCategories.getCategories();
  }
  clearFilters() {
    this.filters = {
      text: '',
      price: 0,
      category_id: '',
    };
    this.productsService.getProducts().subscribe((products) => {
      this.productsService.setProductList(products);
    });
  }
}
