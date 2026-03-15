import React, { useState, useEffect } from "react";
import { RiCheckLine, RiRecycleLine } from "react-icons/ri";
import { KONDISI, inputCls } from "./Constant";
import { referensiAPI } from "../../../../../services/api/routes/referensi.route";

const Label = ({ children, req }) => (
  <p className="mb-1.5 text-[12px] font-bold text-gray-700">
    {children}
    {req && <span className="ml-0.5 text-red-400">*</span>}
  </p>
);

export const StepDetail = ({ form, setForm }) => {
  const [kategoriOptions, setKategoriOptions] = useState([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await referensiAPI.getAll("kategori-barang", {
          include_inactive: true,
        });
        setKategoriOptions(res.data.data || []);
      } catch {
        /* ignore */
      }
    };
    fetchKategori();
  }, []);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    // Di mobile flex-col (vertikal), di layar sm ke atas flex-row (horizontal)
    <div className="flex h-full flex-col gap-5 sm:flex-row sm:gap-6">
      <div className="flex w-full flex-col gap-4 sm:w-1/2">
        <div>
          <Label req>Nama Barang</Label>
          <input
            type="text"
            maxLength={150}
            placeholder="Cth: Botol Kaca Sirup Bekas"
            value={form.nama_barang}
            onChange={set("nama_barang")}
            className={inputCls}
          />
          <p className="mt-1 text-right text-[10px] text-gray-400">
            {form.nama_barang.length}/150
          </p>
        </div>

        <div>
          <Label req>Kategori Barang</Label>
          {/* Di mobile 3 kolom, di desktop 5 kolom */}
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 sm:gap-2">
            {kategoriOptions
              .filter((k) => k.is_active || k.id === form.kategori_barang_id)
              .map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, kategori_barang_id: k.id }))
                  }
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-2 text-center transition-all sm:py-2.5 ${
                    form.kategori_barang_id === k.id
                      ? "border-[#1e1f78] bg-[#eef0ff]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  title={!k.is_active ? "Kategori ini sudah tidak aktif" : ""}
                >
                  <RiRecycleLine
                    size={16}
                    className={
                      form.kategori_barang_id === k.id
                        ? "text-[#1e1f78]"
                        : "text-gray-400"
                    }
                  />
                  <span
                    className={`text-[10px] font-bold ${
                      form.kategori_barang_id === k.id
                        ? "text-[#1e1f78]"
                        : "text-gray-500"
                    }`}
                  >
                    {k.nama} {!k.is_active && "(Nonaktif)"}
                  </span>
                </button>
              ))}
          </div>
        </div>

        <div>
          <Label req>Kondisi Barang</Label>
          <div className="space-y-1.5 sm:space-y-2">
            {KONDISI.map((k) => (
              <button
                key={k.value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, kondisi: k.value }))}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 text-left transition-all ${
                  form.kondisi === k.value
                    ? k.active
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div
                  className={`size-2.5 shrink-0 rounded-full ${form.kondisi === k.value ? k.dot : "bg-gray-300"}`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] leading-tight font-bold">
                    {k.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-400">{k.desc}</p>
                </div>
                {form.kondisi === k.value && <RiCheckLine size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full flex-col sm:mt-0 sm:w-1/2">
        <div className="flex h-full flex-1 flex-col">
          <Label>Deskripsi Barang</Label>
          <textarea
            maxLength={1000}
            placeholder="Jelaskan kondisi barang, ukuran, bahan, dan informasi penting lainnya..."
            value={form.deskripsi_barang}
            onChange={set("deskripsi_barang")}
            // Di mobile berikan min-height agar tidak terlalu kecil saat ditumpuk vertikal
            className={`${inputCls} min-h-[120px] resize-none sm:h-full sm:flex-1`}
          />
          <p className="mt-1.5 text-right text-[10px] text-gray-400">
            {form.deskripsi_barang.length}/1000
          </p>
        </div>
      </div>
    </div>
  );
};
