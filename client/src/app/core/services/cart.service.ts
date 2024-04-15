// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private totalPriceSource = new BehaviorSubject<number>(
    this.loadInitialPrice()
  );
  private cartProductsSource = new BehaviorSubject<Product[]>(
    this.loadInitialProducts()
  );

  totalPrice$ = this.totalPriceSource.asObservable();
  cartProducts$ = this.cartProductsSource.asObservable();

  constructor() {}

  private loadInitialPrice(): number {
    return Number(localStorage.getItem('totalPrice')) || 0;
  }

  private loadInitialProducts(): Product[] {
    const storedProducts = localStorage.getItem('cartProducts');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }

  addProduct(product: Product) {
    const currentProducts = this.cartProductsSource.value;
    const updatedProducts = [...currentProducts, product];
    this.cartProductsSource.next(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));

    this.updateTotalPrice(product.price);
  }

  updateTotalPrice(price: number) {
    const currentTotal = this.totalPriceSource.value + price;
    this.totalPriceSource.next(currentTotal);
    localStorage.setItem('totalPrice', currentTotal.toString());
  }

  resetCart() {
    this.cartProductsSource.next([]);
    localStorage.setItem('cartProducts', JSON.stringify([]));
    this.resetTotalPrice();
  }

  resetTotalPrice() {
    this.totalPriceSource.next(0);
    localStorage.setItem('totalPrice', '0');
  }
}
