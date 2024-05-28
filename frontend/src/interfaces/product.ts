export interface Product {
  id?: number;
  product_name: string;
  price: string;
  desc: string;
  size: string;
  stock: string;
  pict?: string | any;
  categories_id: string;
}
