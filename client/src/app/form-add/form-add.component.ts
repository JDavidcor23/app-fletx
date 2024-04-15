import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsService } from '../core/services/products.service';
import { Product, ProductCreate } from '../interfaces/products';
import { Category } from '../interfaces/categories';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css'],
})
export class FormAddComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  name: string = '';
  category_id: number = 0;
  price: number = 0;
  value: number = 0;
  stock: string = '0';
  public image = '';
  private subscription!: Subscription;
  private editing: boolean = false;
  private editingProductId: number | null = null;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.subscription = this.productService.product$.subscribe({
      next: (product) => {
        if (product) {
          this.loadProductForEdit(product);
        }
      },
      error: (err) => console.error('Error observing product', err),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProductForEdit(product: Product): void {
    this.name = product.name;
    this.category_id = product.category_id;
    this.price = product.price;
    this.value = product.value;
    this.stock = product.stock;
    this.image = product.image;
    this.editing = true;
    this.editingProductId = product.id;
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      console.error('Form is invalid');
      return;
    }

    const product: ProductCreate = {
      name: this.name,
      category_id: this.category_id,
      price: this.price,
      value: this.value,
      stock: this.stock,
      image: this.image,
    };

    try {
      if (this.editing && this.editingProductId) {
        await this.productService.updateProduct(this.editingProductId, product);
      } else {
        await this.productService.createProduct(product);
      }
      this.resetForm(form);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }
  resetForm(form: NgForm): void {
    form.resetForm();
    this.name = '';
    this.category_id = 0;
    this.price = 0;
    this.value = 0;
    this.stock = '0';
    this.image = '';
    this.editing = false;
    this.editingProductId = null;
  }
  async uploadImage(event: Event): Promise<void> {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (!file) {
      console.error('No file selected');
      return;
    }
    try {
      const url = await this.productService.uploadImageCloudinary(file);
      this.image = url;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
