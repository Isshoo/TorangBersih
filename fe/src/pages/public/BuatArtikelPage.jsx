import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArtikelNavbar from "../../components/features/public/artikel/BuatArtikel/ArtikelNavbar";
import ArtikelEditor from "../../components/features/public/artikel/BuatArtikel/ArtikelEditor";
import ArtikelSidebar from "../../components/features/public/artikel/BuatArtikel/ArtikelSidebar";
import ArtikelPublishModal from "../../components/features/public/artikel/BuatArtikel/ArtikelPublishModal";
import ArtikelPreviewModal from "../../components/features/public/artikel/BuatArtikel/ArtikelPreviuwModal";
import toaster from "../../utils/toaster";
import { createArtikel } from "../../components/features/public/artikel/UseArticle";

// Key untuk menyimpan draf agar tidak hilang saat refresh/pindah halaman
const DRAFT_LOCAL_KEY = "torangbersih_draft_artikel";

const BuatArtikelPage = () => {
  const navigate = useNavigate();

  // 1. Ambil data dari localStorage jika ada, kalau kosong pakai default
  const [form, setForm] = useState(() => {
    const savedDraft = localStorage.getItem(DRAFT_LOCAL_KEY);
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (err) {}
    }
    return {
      judul_artikel: "",
      konten_teks: "",
      kategori_id: "",
      foto_cover_url: "",
      status_publikasi: "draft",
    };
  });

  const [saveStatus, setSaveStatus] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  // 2. Tiap kali user mengetik/mengubah form, simpan ke memori lokal
  useEffect(() => {
    localStorage.setItem(DRAFT_LOCAL_KEY, JSON.stringify(form));
  }, [form]);

  const wordCount = useMemo(() => {
    const text = (form.konten_teks ?? "").replace(/<[^>]+>/g, " ").trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
  }, [form.konten_teks]);

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setSaveStatus("");
  }, []);

  // 3. Tombol Reset / Buang Draf
  const handleResetDraft = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua tulisan ini dan mulai dari awal?")) {
      localStorage.removeItem(DRAFT_LOCAL_KEY);
      setForm({
        judul_artikel: "",
        konten_teks: "",
        kategori_id: "",
        foto_cover_url: "",
        status_publikasi: "draft",
      });
      setIsDirty(false);
      setSaveStatus("");
      toaster.success("Draf berhasil dibersihkan.");
    }
  };

  // 4. Integrasi Simpan Draf ke Backend
  const handleSaveDraft = async () => {
    if (!form.judul_artikel.trim()) {
      toaster.warning("Isi judul dulu sebelum menyimpan draf.");
      return;
    }
    setSaveStatus("saving");
    try {
      await createArtikel({ ...form, status_publikasi: "draft" });
      setSaveStatus("saved");
      setIsDirty(false);
      localStorage.removeItem(DRAFT_LOCAL_KEY); 
      toaster.success("Draf berhasil disimpan!");
    } catch (err) {
      setSaveStatus("");
      toaster.error(err.message || "Gagal menyimpan draf.");
    }
  };

  // 5. Integrasi Terbitkan ke Backend
  const handlePublish = async () => {
    setIsPublishing(true);
    setError("");
    try {
      await createArtikel({ ...form, status_publikasi: "published" });
      localStorage.removeItem(DRAFT_LOCAL_KEY); 
      toaster.success("Artikel berhasil diterbitkan!");
      setShowPublish(false);
      setShowPreview(false);
      navigate("/artikel");
    } catch (err) {
      setError(err.message || "Gagal menerbitkan artikel.");
      toaster.error(err.message || "Gagal menerbitkan artikel.");
    } finally {
      setIsPublishing(false);
    }
  };

  const canPublish =
    form.judul_artikel.trim().length > 0 &&
    wordCount >= 50 &&
    !!form.kategori_id;

  return (
    <div className="min-h-screen bg-[#f3f3fc]">
      <div className="mx-auto max-w-7xl px-4 pt-30 space-y-5 pb-20 sm:px-6 lg:px-8">
        <ArtikelNavbar
          saveStatus={saveStatus}
          isDirty={isDirty}
          canPublish={canPublish}
          onBack={() => navigate(-1)}
          onSaveDraft={handleSaveDraft}
          onPreview={() => setShowPreview(true)}
          onPublish={() => setShowPublish(true)}
          onReset={handleResetDraft} // Lempar fungsi Reset ke tombol sampah
        />
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <ArtikelEditor
                judul={form.judul_artikel}
                konten={form.konten_teks}
                onJudulChange={(v) => handleFormChange("judul_artikel", v)}
                onKontenChange={(v) => handleFormChange("konten_teks", v)}
              />
            </div>
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-[88px]">
              <ArtikelSidebar
                form={form}
                wordCount={wordCount}
                readTime={readTime}
                onFormChange={handleFormChange}
              />
            </div>
          </div>
        </div>
      </div>

      <ArtikelPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onPublish={() => {
          setShowPreview(false);
          setShowPublish(true);
        }}
        form={form}
        wordCount={wordCount}
        readTime={readTime}
        canPublish={canPublish}
      />

      <ArtikelPublishModal
        isOpen={showPublish}
        onClose={() => setShowPublish(false)}
        onPublish={handlePublish}
        form={form}
        wordCount={wordCount}
        readTime={readTime}
        isPublishing={isPublishing}
      />
    </div>
  );
};

export default BuatArtikelPage;