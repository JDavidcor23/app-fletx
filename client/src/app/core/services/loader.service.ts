import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader = false;
  private checkout = false;

  constructor() {}

  setLoader(): void {
    this.loader = !this.loader;
  }

  setCheckout(): boolean {
    return (this.checkout = !this.checkout);
  }
  getLoader(): boolean {
    return this.loader;
  }
  getCheckout(): boolean {
    return this.checkout;
  }
}
