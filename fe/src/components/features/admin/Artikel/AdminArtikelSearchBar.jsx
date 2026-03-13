// components/features/admin/artikel/AdminArtikelSearchBar.jsx
import React from "react";
import { RiSearchLine, RiFilter3Line, RiArrowDownSLine } from "react-icons/ri";

const AdminArtikelSearchBar = ({ 
  search, 
  onSearchChange,
  filters,
  onFilterChange 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <RiSearchLine 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Cari judul artikel atau penulis..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 
                     text-sm outline-none transition-all
                     focus:border-[#1e1f78] focus:ring-4 focus:ring-[#1e1f78]/10"
          style={{ color: "var(--dark-text)" }}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-[#1e1f78] text-white px-6 py-2.5 
                     rounded-lg text-sm font-semibold
                     hover:bg-[#1a1b65] transition-colors"
        >
          Cari
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <FilterDropdown
          label="Semua Jenis"
          value={filters?.jenis || ""}
          onChange={(val) => onFilterChange?.("jenis", val)}
          options={[
            { value: "", label: "Semua Jenis" },
            { value: "edukasi", label: "Edukasi" },
            { value: "berita", label: "Berita" },
            { value: "event", label: "Event" },
          ]}
        />
        
        <FilterDropdown
          label="Semua Status"
          value={filters?.status || ""}
          onChange={(val) => onFilterChange?.("status", val)}
          options={[
            { value: "", label: "Semua Status" },
            { value: "published", label: "Terbit" },
            { value: "draft", label: "Draft" },
          ]}
        />
        
        <FilterDropdown
          label="Terbaru"
          value={filters?.sort || "terbaru"}
          onChange={(val) => onFilterChange?.("sort", val)}
          options={[
            { value: "terbaru", label: "Terbaru" },
            { value: "terlama", label: "Terlama" },
            { value: "terpopuler", label: "Terpopuler" },
          ]}
        />
      </div>
    </div>
  );
};

// Sub-component untuk dropdown filter
const FilterDropdown = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label || label;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl 
                   border border-gray-300 bg-white
                   text-sm font-medium text-gray-700
                   hover:border-[#1e1f78] hover:bg-gray-50
                   transition-all"
      >
        {selectedLabel}
        <RiArrowDownSLine size={16} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full left-0 mt-2 w-48 bg-white 
                         rounded-xl border border-gray-200 shadow-lg 
                         py-2 z-20">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm
                           hover:bg-gray-50 transition-colors
                           ${opt.value === value ? "bg-[#f8f9ff] text-[#1e1f78] font-semibold" : "text-gray-700"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminArtikelSearchBar;