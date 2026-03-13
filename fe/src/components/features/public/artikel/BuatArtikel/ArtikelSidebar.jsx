import React, { useState } from "react";
import {
  RiBook2Line,
  RiNewspaperLine,
  RiCalendarEventLine,
  RiChat3Line,
  RiImageAddLine,
  RiCloseLine,
  RiTimeLine,
  RiFileTextLine,
  RiCheckLine,
  RiInformationLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiStarLine,
  RiLightbulbLine,
} from "react-icons/ri";

const KATEGORI_LIST = [
  {
    id: "a245825c-dc9a-452c-8f65-261af8f72029", // <-- UUID Edukasi (dari Create.bru)
    label: "Edukasi",
    desc: "Artikel ilmu & edukasi lingkungan",
    icon: RiBook2Line,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-300",
  },
  {
    id: "b1111111-1111-1111-1111-111111111111", // <-- Ganti dengan UUID Kategori Berita di DB Anda
    label: "Berita",
    desc: "Kabar terkini seputar lingkungan",
    icon: RiNewspaperLine,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-300",
  },
  {
    id: "c1111111-1111-1111-1111-111111111111", // <-- Ganti dengan UUID Kategori Event di DB Anda
    label: "Event",
    desc: "Kegiatan atau kampanye",
    icon: RiCalendarEventLine,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-300",
  },
  {
    id: "d1111111-1111-1111-1111-111111111111", // <-- Ganti dengan UUID Kategori Opini di DB Anda
    label: "Opini",
    desc: "Pendapat atau sudut pandang",
    icon: RiChat3Line,
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-300",
  },
];

const TARGET_WORDS = 300;

const ArtikelSidebar = ({ form, wordCount, readTime, onFormChange }) => {
  const [coverError, setCoverError] = useState("");
  const [showTips, setShowTips] = useState(true);

  const hasJudul = form.judul_artikel?.trim().length > 0;
  const hasKonten = wordCount >= 50;
  const hasKategori = !!form.kategori_id;
  const hasCover = !!form.foto_cover_url && !coverError;

  const CHECKS = [
    { label: "Judul artikel", done: hasJudul, required: true },
    { label: "Isi artikel (≥ 50 kata)", done: hasKonten, required: true },
    { label: "Pilih topik", done: hasKategori, required: true },
    { label: "Foto cover", done: hasCover, required: false },
  ];

  const doneMandatory = CHECKS.filter((c) => c.required && c.done).length;
  const totalMandatory = CHECKS.filter((c) => c.required).length;
  const percent = Math.round((doneMandatory / totalMandatory) * 100);

  const handleCoverUrl = (e) => {
    onFormChange("foto_cover_url", e.target.value.trim());
    setCoverError("");
  };

  return (
    <div className="space-y-6">
      {/* CHECKLIST */}
      <div className={`rounded-xl border p-5 ${
        percent === 100 ? "border-green-200 bg-green-50" : "border-[#1e1f78]/20 bg-white"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            {percent === 100 ? (
              <><RiCheckLine className="text-green-600" /> Artikel Siap Diterbitkan</>
            ) : (
              <><RiStarLine className="text-[#1e1f78]" /> Kelengkapan Artikel</>
            )}
          </h3>
          <span className={`text-sm font-semibold ${percent === 100 ? "text-green-600" : "text-[#1e1f78]"}`}>{percent}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className={`h-2 transition-all ${percent === 100 ? "bg-green-500" : "bg-[#1e1f78]"}`} style={{ width: `${percent}%` }} />
        </div>
        <ul className="space-y-2 text-sm">
          {CHECKS.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${c.done ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                {c.done && <RiCheckLine className="text-white text-xs" />}
              </div>
              <span className={`${c.done ? "line-through text-gray-400" : "text-gray-700 font-medium"}`}>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PANJANG ARTIKEL */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <RiFileTextLine className="text-gray-400" /> Panjang Artikel
        </h3>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{wordCount} kata</span>
          <span>Target {TARGET_WORDS}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-2 ${wordCount >= TARGET_WORDS ? "bg-green-500" : "bg-[#1e1f78]"}`} style={{ width: `${Math.min((wordCount / TARGET_WORDS) * 100, 100)}%` }} />
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
          <span className="flex items-center gap-1"><RiTimeLine /> {readTime} menit baca</span>
        </div>
      </div>

      {/* PILIH TOPIK */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Pilih Topik Artikel</h3>
        <div className="grid grid-cols-2 gap-3">
          {KATEGORI_LIST.map((kat) => {
            const Icon = kat.icon;
            const selected = form.kategori_id === kat.id;
            return (
              <button
                key={kat.id}
                onClick={() => onFormChange("kategori_id", kat.id)}
                className={`rounded-lg border p-3 text-left transition ${selected ? `${kat.bg} ${kat.border}` : "border-gray-200 hover:bg-gray-50"}`}
              >
                <Icon className={`text-lg mb-1 ${selected ? kat.color : "text-gray-400"}`} />
                <p className="text-xs font-semibold text-gray-700">{kat.label}</p>
                <p className="text-[11px] text-gray-500">{kat.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* FOTO COVER */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <RiImageAddLine className="text-gray-400" /> Foto Cover
        </h3>
        {form.foto_cover_url && !coverError ? (
          <div className="relative mb-3 rounded-lg overflow-hidden">
            <img src={form.foto_cover_url} alt="cover" onError={() => setCoverError("Gambar tidak bisa dimuat")} className="h-36 w-full object-cover" />
            <button onClick={() => { onFormChange("foto_cover_url", ""); setCoverError(""); }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
              <RiCloseLine />
            </button>
          </div>
        ) : (
          <div className="h-28 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 mb-3">
            <RiImageAddLine size={24} />
          </div>
        )}
        <input type="url" value={form.foto_cover_url} onChange={handleCoverUrl} placeholder="https://images.unsplash.com/..." className="w-full border rounded-lg px-3 py-2 text-sm focus:border-[#1e1f78] outline-none" />
        {coverError && <p className="text-xs text-red-500 mt-2">{coverError}</p>}
      </div>

      {/* TIPS */}
      <div className="bg-white border rounded-xl shadow-sm">
        <button onClick={() => setShowTips(!showTips)} className="flex items-center justify-between w-full px-5 py-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-gray-700"><RiLightbulbLine /> Tips Menulis</span>
          {showTips ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        </button>
        {showTips && (
          <div className="border-t px-5 py-4 space-y-3 text-xs text-gray-600">
            <p>Gunakan judul yang jelas dan mudah dipahami.</p>
            <p>Mulai artikel dengan inti cerita.</p>
            <p>Gunakan foto agar artikel lebih menarik.</p>
            <p>Bagi artikel menjadi beberapa sub judul.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtikelSidebar;