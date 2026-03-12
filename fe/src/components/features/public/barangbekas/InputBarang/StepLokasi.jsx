import React, { useState } from "react";
import { RiMapPinLine, RiCheckboxCircleLine, RiWhatsappLine } from "react-icons/ri";
import { InteractiveMapPicker } from "./InteractiveMapPicker";
import { inputCls } from "../../barangbekas/InputBarang/Constant";

const Label = ({ children, req }) => (
  <p className="mb-1.5 text-[12px] font-bold text-gray-700">
    {children}{req && <span className="ml-0.5 text-red-400">*</span>}
  </p>
);

export const StepLokasi = ({ form, setForm }) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [waError, setWaError] = useState("");

  const handleMapChange = (lat, lng) => setForm(p => ({ ...p, latitude: lat, longitude: lng }));

  const handleGPS = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(p => ({ ...p, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
        setGpsLoading(false);
      },
      () => setGpsLoading(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleWA = e => {
    const val = e.target.value.replace(/\D/g, "");
    setForm(p => ({ ...p, no_whatsapp: val }));
    if (val && val.length < 9) setWaError("Nomor WA minimal 9 digit");
    else setWaError("");
  };

  const waPreview = form.no_whatsapp ? `https://wa.me/${form.no_whatsapp.startsWith("0") ? "62" + form.no_whatsapp.slice(1) : form.no_whatsapp}` : null;

  return (
    <div className="flex h-full gap-6">
      <div className="flex w-1/2 flex-col gap-4 h-full">
        <div className="shrink-0">
          <Label req>Alamat Lengkap / Patokan COD</Label>
          <textarea rows={2} placeholder="Cth: Jl. Mawar No. 12, pagar hitam..." value={form.alamat_lokasi || ""} onChange={e => setForm(p => ({ ...p, alamat_lokasi: e.target.value }))} className={`${inputCls} resize-none`} />
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          <Label>Tandai Peta Lokasi</Label>
          <div className="flex flex-col flex-1 h-full rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-sm">
            <div className="flex-1 relative">
              <InteractiveMapPicker latitude={form.latitude} longitude={form.longitude} onChange={handleMapChange} />
            </div>
            <div className="shrink-0 bg-white border-t border-gray-200 p-2.5 flex items-center justify-between z-10 relative">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Koordinat Pin</span>
                <span className="font-mono text-[11px] font-bold text-[#1e1f78]">{form.latitude ? `${form.latitude.toFixed(5)}, ${form.longitude.toFixed(5)}` : "Belum ditentukan"}</span>
              </div>
              <button type="button" onClick={handleGPS} disabled={gpsLoading} className="flex items-center gap-1.5 rounded-lg bg-[#eef0ff] px-3 py-1.5 text-[11px] font-bold text-[#1e1f78] hover:bg-[#e4e6ff] transition-colors disabled:opacity-50">
                {gpsLoading ? <RiMapPinLine size={14} className="animate-spin"/> : <RiMapPinLine size={14} />} {gpsLoading ? "Mencari..." : "Gunakan GPS Saya"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col gap-4">
        <div>
          <Label req>Nomor WhatsApp</Label>
          <div className="relative">
            <div className="absolute left-0 top-0 flex h-full items-center rounded-l-xl border-y border-l border-gray-200 bg-gray-100 px-3.5"><RiWhatsappLine size={16} className="text-emerald-500" /><span className="ml-2 text-[12px] font-bold text-gray-500">+62</span></div>
            <input type="tel" placeholder="812-3456-7890" value={form.no_whatsapp} onChange={handleWA} className={`${inputCls} pl-20 ${waError ? "border-red-400 bg-red-50 focus:border-red-500" : ""}`} />
          </div>
          {waError && <p className="mt-1 text-[11px] text-red-500">{waError}</p>}
        </div>
        
        {waPreview && !waError && (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-emerald-500"><RiWhatsappLine size={16} className="text-white" /></div>
              <div><p className="text-[12px] font-bold text-gray-800">Tampilan tombol di listing</p></div>
            </div>
            <div className="p-4">
              <a href={waPreview} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-[13px] font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"><RiWhatsappLine size={17} />Hubungi via WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};