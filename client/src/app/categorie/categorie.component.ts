import { Component, Input } from '@angular/core';
import { Category } from '../interfaces/categories';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css',
})
export class CategorieComponent {
  @Input() categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  getCategoryDescription(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.description : 'Categoría no encontrada';
  }
  editCategorie(product: Category): void {
    this.categoryService.setCurrentCategory(product);
  }
  deleteCategorie(id: number | undefined): void {
    if (!id) {
      return;
    }
    this.categoryService.deleteCategory(id);
  }
}
