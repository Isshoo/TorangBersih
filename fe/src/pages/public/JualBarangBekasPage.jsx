import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiStoreLine, RiCheckLine, RiCloseLine, RiArrowLeftLine, RiArrowRightLine, RiCheckboxCircleLine } from "react-icons/ri";

// Impor komponen yang sudah dipisah
import { STEPS } from "../../components/features/public/barangbekas/InputBarang/Constant";
import { StepFoto } from "../../components/features/public/barangbekas/InputBarang/StepFoto";
import { StepDetail } from "../../components/features/public/barangbekas/InputBarang/StepDetail";
import { StepHarga } from "../../components/features/public/barangbekas/InputBarang/StepHarga";
import { StepLokasi } from "../../components/features/public/barangbekas/InputBarang/StepLokasi";

const JualBarangBekasPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fotos, setFotos] = useState([]);

  const [form, setForm] = useState({
    nama_barang: "", kategori_barang: "", deskripsi_barang: "",
    harga: "", isDonasi: false, berat_estimasi_kg: "", kondisi: "",
    status_ketersediaan: "Tersedia", alamat_lokasi: "", latitude: null,
    longitude: null, no_whatsapp: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const canNext = {
    1: fotos.length > 0,
    2: form.nama_barang.trim() && form.kategori_barang && form.kondisi,
    3: form.isDonasi || form.harga !== "",
    4: form.no_whatsapp.length >= 9 && form.alamat_lokasi.trim().length > 0 && form.latitude && form.longitude,
  };

  const handleSubmit = async () => {
    if (!canNext[4]) return;
    setLoading(true);
    // Simulasikan koneksi backend
    const payload = {
      ...form, 
      foto_barang_urls: fotos.map(f => f.url),
      harga: form.isDonasi ? 0 : parseInt(form.harga) || 0,
    };
    console.log("Payload siap dikirim ke backend:", payload);
    setTimeout(() => { setLoading(false); navigate(-1); }, 1200);
  };

  const stepLabels = { 1:"Foto", 2:"Detail", 3:"Harga", 4:"Lokasi & WA" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-[820px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" style={{ height: "min(620px, 92vh)" }}>
        
        {/* Header Modal */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-7 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#eef0ff]">
              <RiStoreLine size={18} className="text-[#1e1f78]" />
            </div>
            <div>
              <p className="text-[15px] font-black text-gray-900">Jual Barang Bekas</p>
              <p className="text-[11px] text-gray-400">Langkah {step} dari 4 — {stepLabels[step]}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all ${
                  step > s.id ? "bg-emerald-100 text-emerald-700" : step === s.id ? "bg-[#1e1f78] text-white shadow-sm" : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.id ? <RiCheckLine size={12} /> : <s.icon size={12} />}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`h-px w-4 ${step > s.id ? "bg-emerald-300" : "bg-gray-200"}`} />}
              </React.Fragment>
            ))}
          </div>

          <button onClick={() => navigate(-1)} className="flex size-9 items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <RiCloseLine size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Body Modal (Memanggil Komponen) */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {step === 1 && <StepFoto fotos={fotos} setFotos={setFotos} />}
          {step === 2 && <StepDetail form={form} setForm={setForm} />}
          {step === 3 && <StepHarga form={form} setForm={setForm} />}
          {step === 4 && <StepLokasi form={form} setForm={setForm} />}
        </div>

        {/* Footer Modal (Navigasi) */}
        <div className="shrink-0 border-t border-gray-100 bg-gray-50/80 px-7 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {STEPS.map(s => (
              <div key={s.id} className={`h-1.5 rounded-full transition-all ${step === s.id ? "w-6 bg-[#1e1f78]" : step > s.id ? "w-3 bg-emerald-400" : "w-3 bg-gray-200"}`} />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50">
                <RiArrowLeftLine size={15} /> Kembali
              </button>
            )}
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext[step]} className="flex items-center gap-1.5 rounded-xl bg-[#1e1f78] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-[#16175e] disabled:opacity-40">
                Lanjut <RiArrowRightLine size={15} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!canNext[4] || loading} className="flex items-center gap-2 rounded-xl bg-[#1e1f78] px-6 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-[#16175e] disabled:opacity-40">
                {loading ? "Menerbitkan..." : <><RiCheckboxCircleLine size={16} /> Terbitkan Barang</>}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default JualBarangBekasPage;