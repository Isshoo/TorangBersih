/**
 * DashboardLaporanList.jsx
 * Daftar laporan terbaru dengan foto, status badge, dan detail singkat
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  RiAddLine,
  RiImageLine,
  RiMapPin2Line,
  RiTimeLine,
  RiArrowRightSLine,
  RiRecycleLine,
  RiDeleteBin6Line,
} from "react-icons/ri";

// ─── Status config ─────────────────────────────────────────────────
const STATUS_CFG = {
  menunggu: { label: "Menunggu",  bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-400"  },
  diterima: { label: "Diterima",  bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400"   },
  ditindak: { label: "Ditindak",  bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-400" },
  ditolak:  { label: "Ditolak",   bg: "bg-red-50",    text: "text-red-700",    dot: "bg-red-400"    },
  selesai:  { label: "Selesai",   bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500"  },
};

// ─── Helpers ───────────────────────────────────────────────────────
const fmtDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── Status badge ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_CFG[status] ?? STATUS_CFG.menunggu;
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${s.bg} ${s.text}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Single laporan row ────────────────────────────────────────────
function LaporanRow({ laporan, onClick }) {
  const fotoUrl = laporan.foto_bukti_urls?.[0];
  const karakter = laporan.karakteristik;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:border-[#1e1f78]/20 hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="size-[60px] shrink-0 overflow-hidden rounded-xl bg-[#f3f3fc]">
        {fotoUrl ? (
          <img src={fotoUrl} alt="bukti" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <RiImageLine size={22} className="text-gray-300" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-[13px] font-bold leading-tight text-gray-900">
            {laporan.jenis_sampah?.nama ?? laporan.jenis_sampah ?? "Tidak diketahui"}
            {laporan.estimasi_berat_kg && (
              <span className="ml-1.5 text-[11px] font-normal text-gray-400">
                {laporan.estimasi_berat_kg} kg
              </span>
            )}
          </p>
          <StatusBadge status={laporan.status_laporan} />
        </div>

        {/* Location */}
        <p className="flex items-center gap-1 truncate text-[11px] text-gray-500">
          <RiMapPin2Line size={12} className="shrink-0 text-gray-400" />
          {laporan.alamat_lokasi || "Lokasi tidak tersedia"}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1 text-[11px] text-gray-400">
            <RiTimeLine size={12} className="shrink-0" />
            {fmtDate(laporan.created_at)}
          </p>
          <div className="flex items-center gap-1.5">
            {karakter && (
              <span className="flex items-center gap-1 rounded-full bg-[#eef0ff] px-2 py-0.5 text-[10px] font-semibold text-[#1e1f78]">
                {karakter === "bisa_didaur_ulang"
                  ? <RiRecycleLine size={11} />
                  : <RiDeleteBin6Line size={11} />}
                {karakter === "bisa_didaur_ulang" ? "Daur ulang" : "Residu"}
              </span>
            )}
            {laporan.bentuk_timbulan && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold capitalize text-gray-600">
                {laporan.bentuk_timbulan}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Caret */}
      <RiArrowRightSLine size={16} className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-400" />
    </button>
  );
}

// ─── Main export ───────────────────────────────────────────────────
export default function DashboardLaporanList({ data }) {
  const navigate  = useNavigate();
  const laporan   = data?.recent_laporan ?? [];

  return (
    <div>
      {/* Section header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold text-gray-900">Laporan Terbaru</p>
          <p className="text-[11px] text-gray-400">Aktivitas laporan sampah Anda</p>
        </div>
        {laporan.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/laporan")}
            className="text-[12px] font-semibold text-[#1e1f78] transition hover:underline"
          >
            Lihat semua →
          </button>
        )}
      </div>

      {/* Empty state */}
      {laporan.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white py-12 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f3f3fc]">
            <RiImageLine size={28} className="text-gray-300" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-gray-700">Belum ada laporan</p>
            <p className="mt-1 text-[12px] text-gray-400">
              Temukan tumpukan sampah ilegal? Bantu komunitas dengan melaporkannya.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/laporan/buat")}
            className="flex items-center gap-2 rounded-xl bg-[#1e1f78] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#1a1b65]"
          >
            <RiAddLine size={15} /> Buat Laporan Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {laporan.map((l) => (
            <LaporanRow
              key={l.id}
              laporan={l}
              onClick={() => navigate(`/laporan/${l.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}