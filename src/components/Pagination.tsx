// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
    return (
        <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 10].map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <div className="text-sm text-gray-500">/Page</div>
        </div>
    );
};

export default Pagination;