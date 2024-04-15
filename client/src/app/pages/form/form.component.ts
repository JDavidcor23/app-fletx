import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../../products/products.component';
import { FooterComponent } from '../../footer/footer.component';
import { FilterComponent } from '../../filter/filter.component';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../interfaces/products';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/categories';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductEditComponent } from '../../product-edit/product-edit.component';
import { FormAddComponent } from '../../form-add/form-add.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    CommonModule,
    ProductsComponent,
    FooterComponent,
    FormAddComponent,
    MenuComponent,
    ProductEditComponent,
    HeaderComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
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
