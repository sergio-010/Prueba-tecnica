"use server";

import { Products } from "@/interface";

export const getAllProducts = async (): Promise<Products[]> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });
    const data: Products[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Products> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });
    const data: Products = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {} as Products;
  }
};

export const deleteProductById = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error deleting product with ID ${id}`);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
export const createProduct = async (product: Products): Promise<Products> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Error creating product");
    }
    const data: Products = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    return {} as Products;
  }
};
