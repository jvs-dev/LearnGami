import { useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage: number) {
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(data.length / itemsPerPage);

   const currentData = () => {
      const start = (currentPage - 1) * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
   };

   const goToPage = (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
      if (typeof window !== 'undefined') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   };

   const resetPage = () => setCurrentPage(1);

   return {
      currentPage,
      totalPages,
      currentData: currentData(),
      goToPage,
      resetPage
   };
}