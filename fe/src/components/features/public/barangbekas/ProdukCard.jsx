import React from "react";
// 1. IMPORT LINK DARI REACT ROUTER
import { Link } from "react-router-dom"; 

const ProductCard = ({ product }) => {
  const formatHarga = (harga) => {
    if (harga === 0) return <span className="text-green-600 font-bold">Gratis (Donasi)</span>;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(harga);
  };

  const getKondisiColor = (kondisi) => {
    switch (kondisi) {
      case "Layak Pakai": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Butuh Perbaikan": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Rongsokan": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col relative">
      
      {/* Overlay Terjual */}
      {product.status_ketersediaan === "Terjual" && (
        <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <span className="bg-gray-900 text-white font-bold px-4 py-2 rounded-lg transform -rotate-12 shadow-lg">
            SUDAH TERJUAL
          </span>
        </div>
      )}

    
      <Link to={`/barang-bekas/${product.id}`} className="relative aspect-square overflow-hidden bg-gray-100 block">
        <img
          src={product.foto_barang_urls[0]}
          alt={product.nama_barang}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            product.status_ketersediaan === "Terjual" ? "grayscale" : "group-hover:scale-105"
          }`}
        />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wide ${getKondisiColor(product.kondisi)}`}>
          {product.kondisi}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {/* 3. BUNGKUS JUDUL DENGAN LINK AGAR BISA DIKLIK JUGA */}
        <Link to={`/barang-bekas/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors cursor-pointer">
            {product.nama_barang}
          </h3>
        </Link>

        <div className="text-lg font-extrabold text-gray-900 mt-1 flex items-end gap-1">
          {formatHarga(product.harga)}
          <span className="text-xs font-medium text-gray-400 mb-1 ml-1">
            ~ {product.berat_estimasi_kg} kg
          </span>
        </div>

        <div className="mt-auto pt-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate">{product.penjual_nama}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{product.lokasi_cod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;