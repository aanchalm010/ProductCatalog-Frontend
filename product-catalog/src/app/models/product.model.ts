export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string | null;
}

export interface CreateProductDto {
  name: string;
  price: number;
}

export interface UpdateProductDto {
  name: string;
  price: number;
}
