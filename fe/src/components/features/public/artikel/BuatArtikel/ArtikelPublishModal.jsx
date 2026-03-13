import React, { useState } from "react";
import {
  X,
  Check,
  AlertCircle,
  Eye,
  Clock,
  FileText,
  Send,
  Info,
  ArrowLeft,
  BookOpen,
  Newspaper,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

const KATEGORI_MAP = {
  "a245825c-dc9a-452c-8f65-261af8f72029": {
    label: "Edukasi",
    icon: BookOpen,
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  "b1111111-1111-1111-1111-111111111111": {
    label: "Berita",
    icon: Newspaper,
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  "c1111111-1111-1111-1111-111111111111": {
    label: "Event",
    icon: CalendarDays,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  "d1111111-1111-1111-1111-111111111111": {
    label: "Opini",
    icon: MessageSquare,
    color: "text-purple-700",
    bg: "bg-purple-100",
  },
};

const ArtikelPublishModal = ({
  isOpen,
  onClose,
  onPublish,
  form,
  wordCount,
  readTime,
  isPublishing = false,
  isWargaBiasa,
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const kategori = KATEGORI_MAP[form.kategori_id];
  const KatIcon = kategori?.icon;

  const checks = [
    {
      label: "Judul artikel",
      ok: (form.judul_artikel ?? "").trim().length > 0,
      required: true,
      hint: form.judul_artikel?.trim() || "Judul belum diisi",
    },
    {
      label: "Isi artikel minimal 50 kata",
      ok: wordCount >= 50,
      required: true,
      hint: `${wordCount} kata — ${wordCount >= 50 ? "Oke!" : "Perlu lebih banyak"}`,
    },
    {
      label: "Topik artikel",
      ok: !!form.kategori_id,
      required: true,
      hint: kategori?.label ?? "Belum dipilih",
    },
    {
      label: "Foto cover",
      ok: !!form.foto_cover_url,
      required: false,
      hint: form.foto_cover_url ? "Ada" : "Tidak ada — opsional",
    },
  ];

  const mandatoryOk = checks.every((c) => !c.required || c.ok);
  const excerptText = (() => {
    const tmp = document.createElement("div");
    tmp.innerHTML = form.konten_teks ?? "";
    return tmp.textContent.slice(0, 140);
  })();
  

  const handlePublish = () => {
    onPublish();
    setStep(1);
  };
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  // Dynamic Wording
  const titleText = isWargaBiasa
    ? "Ajukan untuk Ditinjau 👀"
    : "Siap Diterbitkan? 🚀";
  const subtitleText = isWargaBiasa
    ? "Artikelmu akan diperiksa oleh tim kami."
    : "Artikel akan langsung bisa dibaca semua orang";
  const buttonText = isWargaBiasa
    ? "Kirim untuk Verifikasi"
    : "Ya, Terbitkan Sekarang!";

  return (
    <>
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="fixed inset-x-4 top-1/2 z-[9999] mx-auto max-w-lg -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {step === 1 ? "Cek Dulu Ya" : titleText}
            </h2>
            <p className="text-xs text-gray-500">
              {step === 1 ? "Pastikan kelengkapan artikel" : subtitleText}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <div className="px-6 py-5">
              <div className="mb-5 overflow-hidden rounded-xl border border-gray-100">
                {form.foto_cover_url && (
                  <img
                    src={form.foto_cover_url}
                    alt="Cover"
                    className="h-36 w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="p-4">
                  {kategori && (
                    <div
                      className={`mb-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${kategori.bg} ${kategori.color}`}
                    >
                      {KatIcon && <KatIcon className="h-3.5 w-3.5" />}
                      {kategori.label}
                    </div>
                  )}
                  <h3 className="mb-1 line-clamp-2 text-base font-bold text-gray-900">
                    {form.judul_artikel || "Judul belum diisi"}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> {wordCount} kata
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {readTime} menit baca
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                {checks.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 rounded-xl px-4 py-3 ${c.ok ? "bg-green-50" : c.required ? "bg-red-50" : "bg-gray-50"}`}
                  >
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${c.ok ? "bg-green-500 text-white" : c.required ? "bg-red-400 text-white" : "bg-gray-300 text-white"}`}
                    >
                      {c.ok ? (
                        <Check className="h-3 w-3" />
                      ) : c.required ? (
                        <AlertCircle className="h-3 w-3" />
                      ) : (
                        <Info className="h-3 w-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${c.ok ? "text-green-800" : c.required ? "text-red-700" : "text-gray-600"}`}
                      >
                        {c.label}
                      </p>
                      <p
                        className={`text-xs ${c.ok ? "text-green-600" : "text-red-500"}`}
                      >
                        {c.hint}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!mandatoryOk}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all disabled:cursor-not-allowed ${mandatoryOk ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 text-gray-400"}`}
              >
                <Eye className="h-4 w-4" />{" "}
                {mandatoryOk ? "Lanjut ke Konfirmasi →" : "Lengkapi Dulu"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="px-6 py-5">
              <div className="mb-6 rounded-xl bg-[#f8f9ff] p-5">
                <div className="mb-3 flex items-start gap-3">
                  <span className="text-3xl">📣</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {isWargaBiasa
                        ? "Alur Verifikasi Artikel:"
                        : "Setelah diterbitkan, artikelmu akan:"}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {isWargaBiasa ? (
                    <>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 text-[#1e1f78]" />{" "}
                        Masuk ke antrean pengecekan oleh Admin
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 text-[#1e1f78]" />{" "}
                        Akan muncul di halaman publik jika disetujui
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 text-[#1e1f78]" />{" "}
                        Kamu bisa memantau statusnya di menu "Artikel Saya"
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 text-[#1e1f78]" />{" "}
                        Langsung tayang untuk semua pengguna
                      </li>
                      <li className="flex items-start gap-2.5 text-xs text-gray-600">
                        <Check className="mt-0.5 h-3.5 w-3.5 text-[#1e1f78]" />{" "}
                        Bisa dikomentari dan dibagikan
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700 disabled:opacity-60"
                >
                  {isPublishing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />{" "}
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> {buttonText}
                    </>
                  )}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Kembali Cek
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtikelPublishModal;
