export interface Product {
  id?: number;
  product_name: string;
  price: number;
  desc: string;
  size: string;
  stock: number;
  pict?: string | any;
  categories_id: number;
}
