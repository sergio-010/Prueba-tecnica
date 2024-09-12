import { useState } from "react";

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export function usePagination<T>(
  data: T[],
  pageSize: number
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);

  const currentData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    currentPage,
    totalPages,
    currentData,
    handlePreviousPage,
    handleNextPage,
  };
}
