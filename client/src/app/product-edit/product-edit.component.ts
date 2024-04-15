import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/products';
import { Category } from '../interfaces/categories';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];

  constructor(private productService: ProductsService) {}

  getCategoryDescription(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.description : 'Categoría no encontrada';
  }
  editProduct(product: Product): void {
    this.productService.setCurrentProduct(product);
  }
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
  }
}
