import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiStoreLine,
  RiCheckLine,
  RiCloseLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";

import { STEPS } from "../../components/features/public/barangbekas/InputBarang/Constant";
import { StepFoto } from "../../components/features/public/barangbekas/InputBarang/StepFoto";
import { StepDetail } from "../../components/features/public/barangbekas/InputBarang/StepDetail";
import { StepHarga } from "../../components/features/public/barangbekas/InputBarang/StepHarga";
import { StepLokasi } from "../../components/features/public/barangbekas/InputBarang/StepLokasi";
import { marketplaceAPI } from "../../services/api/routes/marketplace.route";

const JualBarangBekasPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fotos, setFotos] = useState([]);

  const [form, setForm] = useState({
    nama_barang: "",
    kategori_barang_id: "",
    deskripsi_barang: "",
    harga: "",
    isDonasi: false,
    berat_estimasi_kg: "",
    kondisi: "",
    alamat_lengkap: "",
    kabupaten_kota: "",
    latitude: null,
    longitude: null,
    kontak: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const canNext = {
    1: fotos.length > 0,
    2: form.nama_barang.trim() && form.kategori_barang_id && form.kondisi,
    3: form.isDonasi || form.harga !== "",
    4:
      form.kontak.length >= 9 &&
      form.alamat_lengkap.trim().length > 0 &&
      form.latitude &&
      form.longitude,
  };

  const handleSubmit = async () => {
    if (!canNext[4]) return;
    setLoading(true);
    setSubmitError(null);

    try {
      const data = {
        nama_barang: form.nama_barang,
        kategori_barang_id: form.kategori_barang_id,
        deskripsi_barang: form.deskripsi_barang,
        harga: form.isDonasi ? 0 : parseInt(form.harga) || 0,
        berat_estimasi_kg: form.berat_estimasi_kg
          ? parseFloat(form.berat_estimasi_kg)
          : undefined,
        kondisi: form.kondisi,
        kontak: form.kontak,
        alamat_lengkap: form.alamat_lengkap,
        kabupaten_kota: form.kabupaten_kota,
        latitude: form.latitude,
        longitude: form.longitude,
      };

      // File objects for upload
      const fotoFiles =
        fotos.length > 0
          ? { foto_barang_urls: fotos.map((f) => f.file) }
          : null;

      await marketplaceAPI.create(data, fotoFiles);
      navigate("/barang-bekas", {
        state: { success: "Barang berhasil diterbitkan!" },
      });
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Gagal menerbitkan barang. Coba lagi."
      );
      setLoading(false);
    }
  };

  const stepLabels = { 1: "Foto", 2: "Detail", 3: "Harga", 4: "Lokasi & Kontak" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm">
      <div
        className="flex w-full max-w-[820px] flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl"
        style={{ height: "min(680px, 92vh)" }}
      >
        
        {/* --- HEADER MODAL --- */}
        <div className="flex shrink-0 flex-col border-b border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-4">
          
          {/* Kiri: Judul & Ikon */}
          <div className="flex items-start sm:items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#eef0ff]">
                <RiStoreLine size={20} className="text-[#1e1f78]" />
              </div>
              <div className="flex flex-col">
                <p className="text-[15px] sm:text-[16px] font-black leading-tight text-gray-900">
                  Jual Barang Bekas
                </p>
                <p className="text-[10px] sm:text-[12px] font-medium text-gray-400 mt-0.5">
                  Langkah {step} dari 4 <span className="sm:hidden">— {stepLabels[step]}</span>
                </p>
              </div>
            </div>
            {/* Tombol Close (Khusus Mobile) */}
            <button 
              onClick={() => navigate(-1)} 
              className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 sm:hidden"
            >
              <RiCloseLine size={18} />
            </button>
          </div>

          {/* Kanan: Stepper Responsif Anti-Overlap */}
          <div className="mt-5 flex w-full items-center justify-between sm:mt-0 sm:w-auto sm:justify-center sm:gap-1.5">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                
                {/* Step Item */}
                <div
                  className={`flex shrink-0 flex-col items-center gap-1 sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-3 sm:py-1.5 transition-all ${
                    step > s.id
                      ? "text-emerald-600 sm:bg-emerald-50 sm:text-emerald-700"
                      : step === s.id
                        ? "text-[#1e1f78] sm:bg-[#1e1f78] sm:text-white sm:shadow-sm"
                        : "text-gray-400 sm:bg-gray-50"
                  }`}
                >
                  {/* Lingkaran Ikon (Hanya terlihat bulat di Mobile, menyatu di Desktop) */}
                  <div className={`flex size-7 sm:size-auto items-center justify-center rounded-full sm:bg-transparent ${
                    step > s.id ? "bg-emerald-50" : step === s.id ? "bg-[#eef0ff]" : "bg-gray-50"
                  }`}>
                    {step > s.id ? <RiCheckLine size={14} /> : <s.icon size={14} />}
                  </div>
                  {/* Label Teks */}
                  <span className="text-[9px] sm:text-[11px] font-bold tracking-wide">
                    {s.label}
                  </span>
                </div>

                {/* Garis Penghubung Elastis (flex-1) */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-[2px] sm:h-px flex-1 sm:flex-none sm:w-4 mx-2 sm:mx-0 rounded-full transition-colors ${
                      step > s.id ? "bg-emerald-400 sm:bg-emerald-300" : "bg-gray-100 sm:bg-gray-200"
                    }`}
                  />
                )}

              </React.Fragment>
            ))}
          </div>

          {/* Tombol Close (Khusus Desktop) */}
          <button 
            onClick={() => navigate(-1)} 
            className="hidden size-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 sm:flex ml-4"
          >
            <RiCloseLine size={18} />
          </button>
        </div>
        {/* ------------------------------------- */}

        {/* --- BODY (Isi Form) --- */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 bg-white">
          {submitError && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600 border border-red-100">
              {submitError}
            </div>
          )}
          {step === 1 && <StepFoto fotos={fotos} setFotos={setFotos} />}
          {step === 2 && <StepDetail form={form} setForm={setForm} />}
          {step === 3 && <StepHarga form={form} setForm={setForm} />}
          {step === 4 && <StepLokasi form={form} setForm={setForm} />}
        </div>

        {/* --- FOOTER NAVIGASI --- */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-7 sm:py-4">
          
          {/* Indikator Titik (Bar bawah) */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === s.id ? "w-6 bg-[#1e1f78]" : step > s.id ? "w-2 bg-emerald-400" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Tombol Action */}
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[12px] sm:text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              >
                <RiArrowLeftLine size={15} /> <span className="hidden sm:inline">Kembali</span>
              </button>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext[step]}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#1e1f78] px-5 py-2.5 text-[12px] sm:text-[13px] font-bold text-white shadow-sm hover:bg-[#16175e] hover:shadow-md transition-all disabled:opacity-50 disabled:hover:shadow-sm"
              >
                Lanjut <RiArrowRightLine size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext[4] || loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 sm:px-6 py-2.5 text-[12px] sm:text-[13px] font-bold text-white shadow-sm hover:bg-emerald-700 hover:shadow-md transition-all disabled:opacity-50 disabled:hover:shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="hidden sm:inline">Menerbitkan...</span>
                  </>
                ) : (
                  <>
                    <RiCheckboxCircleLine size={16} /> 
                    <span>Terbitkan <span className="hidden sm:inline">Barang</span></span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JualBarangBekasPage;