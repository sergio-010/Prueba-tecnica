'use client'

import { getAllProducts } from "@/services/products";
import ListProducts from "./product/components/ListProducts";
import { useEffect, useState } from "react";
import { Products } from "@/interface";


export default function Home() {

  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      setProducts(products);
      localStorage.setItem('products', JSON.stringify(products));
    };

    const productStorages = localStorage.getItem('products');

    if (productStorages) {
      setProducts(JSON.parse(productStorages));
      setIsLoading(false);
    } else {
      fetchData();
      setIsLoading(false);
    }

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isLoading === false && error) {
  //tarea

  return (

    <ListProducts
      products={products}
    />

  );
}
