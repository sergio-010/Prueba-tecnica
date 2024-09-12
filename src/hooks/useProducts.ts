"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/products";
import { Products } from "../interface/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    const productStorages = localStorage.getItem("products");

    if (productStorages) {
      setProducts(JSON.parse(productStorages));
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  return { products, isLoading, error };
};
