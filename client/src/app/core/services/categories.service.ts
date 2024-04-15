import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoryObject = new BehaviorSubject<Category | null>(null);
  private categoryListSource = new BehaviorSubject<Category[]>([]);
  categoriesList$ = this.categoryObject.asObservable();
  categoryListSource$ = this.categoryListSource.asObservable();

  constructor(private http: HttpClient) {
    this.getCategories().subscribe((categories) => {
      this.categoryListSource.next(categories);
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      'http://localhost:3000/api/v1/categories/'
    );
  }

  async getCategory(id: string): Promise<Category> {
    return await fetch(`http://localhost:3000/api/v1/categories/${id}`).then(
      (resp) => resp.json()
    );
  }

  async createCategory(category: Category): Promise<void> {
    try {
      const resp = await fetch('http://localhost:3000/api/v1/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      }).then((resp) => resp.json());
      const newUpdatedCategorys = [resp, ...this.categoryListSource.value];
      this.categoryListSource.next(newUpdatedCategorys);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  async updateCategory(id: number, category: Category): Promise<void> {
    const resp = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    }).then((resp) => resp.json());
    const newUpdatedCategorys = this.categoryListSource.value.map((categ) =>
      categ.id === id ? resp : categ
    );
    console.log(newUpdatedCategorys);
    this.categoryListSource.next(newUpdatedCategorys);
  }

  async deleteCategory(id: number): Promise<void> {
    await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
      method: 'DELETE',
    }).then((resp) => resp.json());
    const currentCategory = this.categoryListSource.value;
    const updatedCategory = currentCategory?.filter(
      (category) => category.id !== id
    );
    this.categoryListSource.next(updatedCategory || null);
  }
  setCategoriesList(categories: Category[]): void {
    this.categoryListSource.next(categories);
  }
  setCurrentCategory(category: Category): void {
    this.categoryObject.next(category);
  }
}
