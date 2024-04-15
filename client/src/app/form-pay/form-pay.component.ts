import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductsService } from '../core/services/products.service';
import { Product } from '../interfaces/products';
import { CartService } from '../core/services/cart.service';
import { LoaderService } from '../core/services/loader.service';

@Component({
  selector: 'app-form-pay',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, FormsModule],
  templateUrl: './form-pay.component.html',
  styleUrl: './form-pay.component.css',
})
export class FormPayComponent implements OnInit {
  total$: Observable<number>;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private loaderService: LoaderService
  ) {
    this.total$ = of(0); // Inicializa el Observable del total
  }
  setLoader(): void {
    this.loaderService.setLoader();
  }
  setCheckout(): boolean {
    return this.loaderService.setCheckout();
  }
  get getLoader(): boolean {
    return this.loaderService.getLoader();
  }
  get getCheckout(): boolean {
    return this.loaderService.getCheckout();
  }
  ngOnInit(): void {
    this.getTotalFromLocalStorage();
  }

  private getTotalFromLocalStorage(): void {
    const totalPrice = localStorage.getItem('totalPrice');
    const total = totalPrice ? parseFloat(totalPrice) : 0;
    this.total$ = of(total);
  }
  onSubmitPayment(): void {
    let products;
    const productString = localStorage.getItem('cartProducts');
    if (productString !== null) {
      products = JSON.parse(productString);
      products = products.map((prod: Product) => {
        return {
          name: prod.name,
          price: prod.price,
          image: prod.image,
          category_id: prod.category_id,
          value: 1,
          stock: prod.stock,
          idProduct: prod.id,
          creation_date: prod.creation_date,
          numberOfProducts: 1,
        };
      });
    }
    this.productService.saveTransaction(products);
    this.checkotProduct();
  }
  checkotProduct(): void {
    this.setLoader();
    this.setCheckout();
    this.cartService.resetCart();
    this.cartService.resetTotalPrice();

    setTimeout(() => {
      this.setLoader();
      console.log(this.getCheckout, this.getLoader);
    }, 3000);
    setTimeout(() => {
      window.location.href = '/Home';
      this.setCheckout();
    }, 5000);
  }
}
