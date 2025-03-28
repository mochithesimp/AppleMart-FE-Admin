import React from "react";

const PaginationControls: React.FC<{
  pageNumber: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}> = ({ pageNumber, totalPages, handlePageChange }) => {

  return (
    <div className="flex justify-center mt-4 gap-2 ">
      <button
        disabled={pageNumber === 1}
        onClick={() => handlePageChange(pageNumber - 1)}
        className="pointer-cursor dark:bg-zinc-700 dark:text-white px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="dark:text-white px-3 py-1">{pageNumber}</span>
      <button
        disabled={pageNumber >= totalPages }
        onClick={() => handlePageChange(pageNumber + 1)}
        className="dark:bg-zinc-700 dark:text-white px-3 py-1 bg-gray-800 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
