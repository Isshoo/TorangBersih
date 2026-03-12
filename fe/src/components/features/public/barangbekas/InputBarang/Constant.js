import {
  RiRecycleLine,
  RiCamera2Line,
  RiStoreLine,
  RiPriceTag3Line,
  RiMapPinLine,
} from "react-icons/ri";

export const KATEGORI = [
  { value: "Plastik", label: "Plastik", Icon: RiRecycleLine },
  { value: "Kaca", label: "Kaca", Icon: RiRecycleLine },
  { value: "Logam", label: "Logam", Icon: RiRecycleLine },
  { value: "Kertas", label: "Kertas", Icon: RiRecycleLine },
  { value: "Elektronik", label: "Elektronik", Icon: RiRecycleLine },
];

export const KONDISI = [
  {
    value: "Layak Pakai",
    desc: "Siap digunakan",
    dot: "bg-emerald-500",
    active: "border-emerald-400 bg-emerald-50 text-emerald-800",
  },
  {
    value: "Butuh Perbaikan",
    desc: "Perlu diperbaiki",
    dot: "bg-amber-500",
    active: "border-amber-400 bg-amber-50 text-amber-800",
  },
  {
    value: "Rongsokan",
    desc: "Untuk material daur ulang",
    dot: "bg-red-400",
    active: "border-red-400 bg-red-50 text-red-800",
  },
];

export const MAX_FOTO = 8;

export const STEPS = [
  { id: 1, label: "Foto", icon: RiCamera2Line },
  { id: 2, label: "Detail", icon: RiStoreLine },
  { id: 3, label: "Harga", icon: RiPriceTag3Line },
  { id: 4, label: "Lokasi & WA", icon: RiMapPinLine },
];

export const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[13px] text-gray-800 placeholder:text-gray-400 transition-all focus:border-[#1e1f78] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e1f78]/10";
