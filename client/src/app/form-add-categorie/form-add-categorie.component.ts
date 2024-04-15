import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../interfaces/categories';
import { CategoriesService } from '../core/services/categories.service';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-add-categorie.component.html',
  styleUrl: './form-add-categorie.component.css',
})
export class FormAddComponent implements OnDestroy {
  @Input() categories: Category[] = [];
  name: string = '';
  description: string = '';
  private subscription!: Subscription;
  private editing: boolean = false;
  private editingcategoriesId: number | null = null;

  constructor(private categoriService: CategoriesService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.categoriService.categoriesList$.subscribe({
      next: (category) => {
        if (category) {
          this.loadcategoriesForEdit(category);
        }
      },
      error: (err) => console.error('Error observing product', err),
    });
  }

  loadcategoriesForEdit(categories: Category): void {
    console.log({ categories });
    this.name = categories.name;
    this.description = categories.description;
    this.editing = true;
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }

    const categories: Category = {
      name: this.name,
      description: this.description,
    };

    try {
      if (this.editing && this.editingcategoriesId) {
        await this.categoriService.updateCategory(
          this.editingcategoriesId,
          categories
        );
      } else {
        await this.categoriService.createCategory(categories);
      }
      this.resetForm(form);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  }
  resetForm(form: NgForm): void {
    form.resetForm();
    this.name = '';
    this.description = '';
    this.editing = false;
    this.editingcategoriesId = null;
  }
}
