import { EnumCategories } from "@/interface/categories";

export const getAllCategories = async (): Promise<{
  categories: EnumCategories[];
  error: string | null;
}> => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: EnumCategories[] = await response.json();
    return {
      categories: data,
      error: null,
    };
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error instanceof Error ? error.message : error
    );
    const errorMessage =
      error instanceof Error ? error.message : "Ocurrio un error inesperado";
    return {
      error: errorMessage,
      categories: [],
    };
  }
};
