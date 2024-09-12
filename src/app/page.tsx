'use client';

import ListProducts from "./product/components/ListProducts";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return <ListProducts products={products} />;
}
