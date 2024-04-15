// src/app/products/products.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/products';
import { Category } from '../interfaces/categories';
import { CartService } from '../core/services/cart.service';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];

  constructor(private cartService: CartService) {}

  getCategoryDescription(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.description : 'Categoría no encontrada';
  }

  addProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
