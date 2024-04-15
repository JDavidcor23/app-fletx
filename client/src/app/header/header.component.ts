// src/app/header/header.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { MenuService } from '../core/services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalPrice!: number;
  private subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.totalPrice$.subscribe({
      next: (price) => (this.totalPrice = price),
      error: (err) => console.error('Error al observar el precio total', err),
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  toggleMenu() {
    this.menuService.toggleMenu();
  }

  get isMenuOpen(): boolean {
    return this.menuService.isMenuOpen();
  }
}
