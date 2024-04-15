import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FormComponent } from './pages/form/form.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Checkout', component: CheckoutComponent },
  { path: 'Form', component: FormComponent },
  { path: 'Categories', component: CategoriesComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
];
