// components/features/admin/artikel/AdminArtikelPagnation.jsx
import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const AdminArtikelPagination = ({ page, meta, total, onPageChange }) => {
  const totalPages = meta?.total_pages || 1;

  return (
    <div 
      className="flex items-center justify-between px-6 py-4 
                 border-t border-gray-200 bg-gray-50"
    >
      <p className="text-sm text-gray-600">
        Menampilkan <span className="font-bold text-gray-900">{total}</span> dari{" "}
        <span className="font-bold text-gray-900">{meta?.total || 0}</span> kolaborator
      </p>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-lg 
                     border border-gray-300 text-sm font-medium text-gray-600
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-white hover:border-gray-400 transition-all"
        >
          <RiArrowLeftSLine size={16} />
          Prev
        </button>
        
        <span className="px-4 py-2 text-sm font-semibold text-gray-700">
          Halaman {page} / {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-lg 
                     border border-gray-300 text-sm font-medium text-gray-600
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-white hover:border-gray-400 transition-all"
        >
          Next
          <RiArrowRightSLine size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdminArtikelPagination;