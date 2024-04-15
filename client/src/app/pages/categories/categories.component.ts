import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { FormAddComponent } from '../../form-add-categorie/form-add-categorie.component';
import { MenuComponent } from '../../menu/menu.component';
import { HeaderComponent } from '../../header/header.component';
import { Category } from '../../interfaces/categories';
import { Observable } from 'rxjs';
import { CategorieComponent } from '../../categorie/categorie.component';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    FooterComponent,
    FormAddComponent,
    MenuComponent,
    CategorieComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoriesResults$: Observable<Category[] | null> = new Observable();
  constructor(private serviceCategories: CategoriesService) {}
  ngOnInit(): void {
    this.categoriesResults$ = this.serviceCategories.categoryListSource$;
  }
}
