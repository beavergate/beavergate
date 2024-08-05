import React from "react";

export type PaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  total,
  onPageChange,
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 border rounded ${
            page === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === total}
        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
