export interface ProductObj {
  id?: string | null;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface CartObj {
  products: [];
  totalPrice: number;
}
