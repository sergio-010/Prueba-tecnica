export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  rating: Rating;
}

export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface Rating {
  rate: number;
  count: number;
}
