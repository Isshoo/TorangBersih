import React, { useRef, useState, useCallback } from "react";
import { RiImageAddLine, RiAddLine, RiDraggable, RiCloseLine } from "react-icons/ri";
import { MAX_FOTO } from "../../barangbekas/InputBarang/Constant";

export const StepFoto = ({ fotos, setFotos }) => {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState(null);
  const dragTarget = useRef(null);

  const addFiles = useCallback((files) => {
    const valid = Array.from(files).filter(f =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );
    const slots = MAX_FOTO - fotos.length;
    setFotos(prev => [
      ...prev,
      ...valid.slice(0, slots).map(f => ({
        file: f,
        url: URL.createObjectURL(f),
        id: Math.random().toString(36).slice(2),
      })),
    ]);
  }, [fotos.length, setFotos]);

  const remove = id => setFotos(prev => {
    const p = prev.find(x => x.id === id);
    if (p) URL.revokeObjectURL(p.url);
    return prev.filter(x => x.id !== id);
  });

  const onDrop = e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); };

  return (
    // Di mobile flex-col (atas-bawah), di layar sm flex-row (kiri-kanan)
    <div className="flex flex-col sm:flex-row h-full gap-5 sm:gap-6">
      
      {/* --- AREA UPLOAD (Atas di Mobile, Kiri di Desktop) --- */}
      <div className="flex w-full sm:w-56 shrink-0 flex-col">
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          // Tambahan py-6 untuk mobile agar kotaknya punya tinggi yang cukup
          className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-6 sm:py-0 transition-all ${
            drag ? "border-[#1e1f78] bg-[#eef0ff]" : "border-gray-200 bg-gray-50 hover:border-[#1e1f78]/50 hover:bg-gray-100"
          }`}
        >
          <div className="flex size-12 sm:size-14 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <RiImageAddLine size={24} className="text-[#1e1f78] sm:size-[26px]" />
          </div>
          <div className="text-center px-3">
            <p className="text-[12px] sm:text-[13px] font-bold text-gray-700">{drag ? "Lepaskan di sini" : "Pilih atau Seret foto"}</p>
            <p className="mt-1 text-[10px] sm:text-[11px] text-gray-400">JPG · PNG · WEBP</p>
            <p className="mt-1.5 text-[10px] font-semibold text-[#1e1f78]">Maksimal {MAX_FOTO} foto</p>
          </div>
          <button type="button" className="mt-1 flex items-center gap-1.5 rounded-lg bg-[#1e1f78] px-4 py-1.5 text-[11px] sm:text-[12px] font-bold text-white hover:bg-[#16175e] transition-colors">
            <RiAddLine size={13} /> Pilih Foto
          </button>
        </div>
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
      </div>

      {/* --- AREA PREVIEW (Bawah di Mobile, Kanan di Desktop) --- */}
      <div className="flex flex-1 flex-col gap-2 sm:gap-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-[11px] sm:text-[12px] font-bold text-gray-700">Preview Foto</p>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-gray-500">
            {fotos.length}/{MAX_FOTO}
          </span>
        </div>

        {fotos.length === 0 ? (
          <div className="flex flex-1 min-h-[100px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
            <p className="text-[11px] sm:text-[12px] text-gray-400">Foto yang dipilih akan muncul di sini</p>
          </div>
        ) : (
          // Di mobile: flex horizontal bergeser (swipe), Di desktop: Grid 4 kolom
          <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
            {fotos.map((foto, idx) => (
              <div 
                key={foto.id} 
                draggable 
                onDragStart={() => setDraggingIdx(idx)} 
                onDragEnter={() => { dragTarget.current = idx; }}
                onDragEnd={() => {
                  if (draggingIdx !== null && dragTarget.current !== null && draggingIdx !== dragTarget.current) {
                    setFotos(prev => {
                      const n = [...prev]; const [m] = n.splice(draggingIdx, 1); n.splice(dragTarget.current, 0, m); return n;
                    });
                  }
                  setDraggingIdx(null); dragTarget.current = null;
                }}
                // Mobile: kotak ukuran pas (size-20), Desktop: otomatis menyesuaikan grid (aspect-square)
                className={`group relative size-20 sm:size-auto sm:w-full sm:aspect-square shrink-0 cursor-grab overflow-hidden rounded-xl border-2 transition-all active:cursor-grabbing ${
                  idx === 0 ? "border-[#1e1f78] ring-2 ring-[#1e1f78]/20" : "border-gray-200"
                } ${draggingIdx === idx ? "opacity-40 scale-95" : ""}`}
              >
                <img src={foto.url} alt="" className="h-full w-full object-cover" draggable={false} />
                {/* Label Cover (Sampul) */}
                {idx === 0 && <div className="absolute bottom-0 inset-x-0 bg-[#1e1f78] py-0.5 text-center text-[8px] sm:text-[9px] font-bold text-white">Cover</div>}
                {/* Ikon Drag (Hanya terlihat saat di-hover di desktop) */}
                <div className="absolute left-1 top-1 hidden rounded bg-black/40 p-0.5 sm:group-hover:flex">
                  <RiDraggable size={10} className="text-white" />
                </div>
                {/* Tombol Hapus */}
                <button 
                  type="button" 
                  onClick={e => { e.stopPropagation(); remove(foto.id); }} 
                  // Di mobile selalu terlihat kecil, di desktop muncul saat hover
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-white shadow sm:hidden sm:group-hover:flex"
                >
                  <RiCloseLine size={12} />
                </button>
              </div>
            ))}

            {/* Kotak Tambah Foto Lanjutan */}
            {fotos.length < MAX_FOTO && (
              <button 
                type="button" 
                onClick={() => inputRef.current?.click()} 
                // Sama seperti kotak preview, di mobile size-20, di desktop aspect-square
                className="flex size-20 sm:size-auto sm:w-full sm:aspect-square shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-[#1e1f78]/50 hover:bg-gray-100 transition-all"
              >
                <RiAddLine size={20} className="text-gray-400 sm:size-[22px]" />
              </button>
            )}
          </div>
        )}
        <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">Foto pertama jadi cover. Tahan dan geser (drag) untuk mengubah urutan.</p>
      </div>

      {/* Sembunyikan scrollbar bawaan browser untuk area swipe horizontal */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};