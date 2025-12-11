import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {  
  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;
    
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="Navegação de páginas">      
      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <i className="bi bi-chevron-left" aria-hidden="true"></i>
      </button>
      
      {startPage > 1 && (
        <>
          <button 
            className="pagination__number" 
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {startPage > 2 && <span className="pagination__ellipsis">...</span>}
        </>
      )}
      
      {pages.map((number) => (
        <button
          key={number}
          className={`pagination__number ${
            currentPage === number ? "pagination__number--active" : ""
          }`}
          onClick={() => onPageChange(number)}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="pagination__ellipsis">...</span>
          )}
          <button
            className="pagination__number"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        className="pagination__button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <i className="bi bi-chevron-right" aria-hidden="true"></i>
      </button>
    </nav>
  );
};

export default Pagination;