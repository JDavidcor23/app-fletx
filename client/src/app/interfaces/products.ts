export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  value: number;
  stock: string;
  image: string;
  creation_date: string;
}

export interface ProductCreate {
  name: string;
  category_id: number;
  price: number;
  value: number;
  stock: string;
  image: string;
}
//edit proctudct

// export interface ProductUpdate {
//   name: string;
//   category_id: number;
//   price: number;
//   value: number;
//   stock: string;
//   image: string;
// }
