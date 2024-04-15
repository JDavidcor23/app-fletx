import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../core/services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private menuService: MenuService) {}
  get isMenuOpen(): boolean {
    return this.menuService.isMenuOpen();
  }
  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
