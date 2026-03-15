/**
 * DashboardArtikelList.jsx
 * Daftar artikel terbaru user (jika ada)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { RiArticleLine, RiTimeLine, RiArrowRightSLine } from "react-icons/ri";

// ─── Status config ─────────────────────────────────────────────────
const STATUS_CFG = {
  published: { label: "Tayang", bg: "bg-green-100", text: "text-green-700" },
  draft: { label: "Draft", bg: "bg-gray-100", text: "text-gray-600" },
  archived: { label: "Arsip", bg: "bg-orange-100", text: "text-orange-700" },
};

const fmtDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Single artikel row ────────────────────────────────────────────
function ArtikelRow({ artikel, onClick }) {
  // Menggunakan status_publikasi dari Backend
  const statusKey = artikel?.status_publikasi?.toLowerCase() || "draft";
  const s = STATUS_CFG[statusKey] ?? STATUS_CFG.draft;
  
  const [imgError, setImgError] = React.useState(false);

  // Menggunakan judul_artikel dan foto_cover_url dari Backend
  const judulArtikel = artikel?.judul_artikel || "Tanpa Judul";
  const coverImgUrl = artikel?.foto_cover_url;
  
  const showImg = coverImgUrl && !imgError;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:border-[#5697ff]/20 hover:shadow-md"
    >
      {/* Cover thumbnail */}
      <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-[#f3f3fc]">
        {showImg ? (
          <img
            src={coverImgUrl}
            alt="Cover Artikel"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <RiArticleLine size={20} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-gray-900">
          {judulArtikel}
        </p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-400">
          <RiTimeLine size={11} className="shrink-0" />
          {/* Menggunakan waktu_publish atau fallback ke created_at */}
          {fmtDate(artikel?.waktu_publish || artikel?.created_at)}
        </p>
      </div>

      {/* Status badge */}
      <span
        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${s.bg} ${s.text}`}
      >
        {s.label}
      </span>

      {/* Caret */}
      <RiArrowRightSLine
        size={16}
        className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-400"
      />
    </button>
  );
}

// ─── Main export ───────────────────────────────────────────────────
export default function DashboardArtikelList({ data }) {
  const navigate = useNavigate();
  const artikel = data?.recent_artikel ?? [];

  if (artikel.length === 0) return null; // sembunyikan kalau kosong

  return (
    <div>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold text-gray-900">Artikel Terbaru</p>
          <p className="text-[11px] text-gray-400">
            Tulisan yang sudah Anda buat
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/artikel")}
          className="text-[12px] font-semibold text-[#5697ff] transition hover:underline"
        >
          Lihat semua →
        </button>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {artikel.map((a, idx) => (
          <ArtikelRow
            key={a.id || idx}
            artikel={a}
            onClick={() => navigate(`/artikel/${a.id}`)}
          />
        ))}
      </div>
    </div>
  );
}