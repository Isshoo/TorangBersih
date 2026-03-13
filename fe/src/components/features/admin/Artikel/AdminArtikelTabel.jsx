// components/features/admin/artikel/AdminArtikelTabel.jsx
import React from "react";
import AdminArtikelSearchBar from "./AdminArtikelSearchBar";
import AdminArtikelTabelRow from "./AdminArtikelTabelRow";
import AdminArtikelPagination from "./AdminArtikelPagnation";

const AdminArtikelTabel = ({
  articles,
  loading,
  search,
  onSearchChange,
  filters,
  onFilterChange,
  page,
  meta,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <AdminArtikelSearchBar
        search={search}
        onSearchChange={onSearchChange}
        filters={filters}
        onFilterChange={onFilterChange}
      />

      {/* Table Container */}
      <div 
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <TableHeader label="Organisasi" />
                <TableHeader label="Jenis & Wilayah" />
                <TableHeader label="Status" />
                <TableHeader label="Waktu" />
                <TableHeader label="Aksi" align="right" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              ) : articles.length === 0 ? (
                <EmptyRow />
              ) : (
                articles.map((item) => (
                  <AdminArtikelTabelRow
                    key={item.id}
                    item={item}
                    onView={() => onView(item)}
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <AdminArtikelPagination
          page={page}
          meta={meta}
          total={articles.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

// Sub-components
const TableHeader = ({ label, align }) => (
  <th
    className={`px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider
                ${align === "right" ? "text-right" : "text-left"}`}
  >
    {label}
  </th>
);

const SkeletonRow = () => (
  <tr className="border-b border-gray-100">
    <td colSpan="5" className="px-6 py-4">
      <div className="animate-pulse flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </td>
  </tr>
);

const EmptyRow = () => (
  <tr>
    <td colSpan="5" className="px-6 py-16 text-center">
      <div className="flex flex-col items-center justify-center text-gray-400">
        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium">Tidak ada artikel ditemukan</p>
        <p className="text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
      </div>
    </td>
  </tr>
);

export default AdminArtikelTabel;