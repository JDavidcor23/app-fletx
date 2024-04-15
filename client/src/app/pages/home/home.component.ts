import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../../products/products.component';
import { FooterComponent } from '../../footer/footer.component';
import { FilterComponent } from '../../filter/filter.component';
import { HeaderComponent } from '../../header/header.component';
import { ProductsService } from '../../core/services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/products';
import { Category } from '../../interfaces/categories';
import { CategoriesService } from '../../core/services/categories.service';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    CommonModule,
    ProductsComponent,
    FooterComponent,
    FilterComponent,
    MenuComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public productsResults$!: Observable<Product[]>;
  public categoriesResults$!: Observable<Category[]>;
  constructor(
    private serviceProducts: ProductsService,
    private serviceCategories: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productsResults$ = this.serviceProducts.productList$;
    this.categoriesResults$ = this.serviceCategories.getCategories();
  }
}
