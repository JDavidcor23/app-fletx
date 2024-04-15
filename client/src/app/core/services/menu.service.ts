import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuOpen = false;

  constructor() {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isMenuOpen(): boolean {
    return this.menuOpen;
  }
}
