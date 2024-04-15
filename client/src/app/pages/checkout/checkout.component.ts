import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../../products/products.component';
import { FooterComponent } from '../../footer/footer.component';
import { FilterComponent } from '../../filter/filter.component';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../interfaces/products';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormPayComponent } from '../../form-pay/form-pay.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductsComponent,
    FooterComponent,
    FilterComponent,
    FormPayComponent,
    MenuComponent,
    HeaderComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  public productsResults$!: Observable<Product[]>;
  constructor() {}

  ngOnInit(): void {
    const cartData = localStorage.getItem('cartProducts');
    if (cartData) {
      const products: Product[] = JSON.parse(cartData);
      this.productsResults$ = of(products);
    } else {
      this.productsResults$ = of([]);
    }
  }
}
