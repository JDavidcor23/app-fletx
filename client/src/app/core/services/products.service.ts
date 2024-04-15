import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductCreate } from '../../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSource = new BehaviorSubject<Product | null>(null);
  private productListSource = new BehaviorSubject<Product[]>([]);
  product$ = this.productSource.asObservable();
  productList$ = this.productListSource.asObservable();

  constructor(private http: HttpClient) {
    this.getProducts().subscribe((products) => {
      this.setProductList(products);
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products');
  }

  async getProduct(id: string): Promise<Product> {
    return await fetch(`http://localhost:3000/api/v1/products/${id}`).then(
      (resp) => resp.json()
    );
  }

  async createProduct(product: ProductCreate): Promise<void> {
    try {
      const resp = await fetch('http://localhost:3000/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json());
      const newUpdatedProducts = [resp, ...this.productListSource.value];
      this.productListSource.next(newUpdatedProducts);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  async updateProduct(id: number, product: ProductCreate): Promise<void> {
    const resp = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then((resp) => resp.json());
    const newUpdatedProducts = this.productListSource.value.map((prod) =>
      prod.id === id ? resp : prod
    );
    this.productListSource.next(newUpdatedProducts);
  }

  async deleteProduct(id: number): Promise<void> {
    await fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'DELETE',
    }).then((resp) => resp.json());
    const currentProducts = this.productListSource.value;
    const updatedProducts = currentProducts.filter(
      (product) => product.id !== id
    );
    this.productListSource.next(updatedProducts);
  }

  async uploadImageCloudinary(image: File): Promise<string> {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dbtk64lp4/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'demo_reel');
    formData.append('file', image);
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  }
  async saveTransaction(products: any): Promise<void> {
    console.log({ products });
    await fetch('http://localhost:3000/api/v1/saveTransaction/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });
  }
  setCurrentProduct(product: Product): void {
    this.productSource.next(product);
  }
  setProductList(products: Product[]): void {
    this.productListSource.next(products);
  }
  getFilteredProducts(filters: any): void {
    this.getProducts().subscribe((products) => {
      let filteredProducts = products;
      if (filters.categorye_id !== 0 || filters.price !== 0) {
        filteredProducts = products.filter((product) =>
          filters.category_id
            ? product.category_id === filters.category_id
            : product.name.includes(filters.name)
        );
      }
      if (filters.price !== 0) {
        console.log(filters.price);
        console.log(filteredProducts);
        const filterByPrice = filteredProducts.filter(
          (product) => product.price >= filters.price
        );
        filteredProducts = filterByPrice;
      }
      this.setProductList(filteredProducts);
    });
  }
}
