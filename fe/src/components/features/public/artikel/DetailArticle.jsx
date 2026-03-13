import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginModal from "../../../common/LoginModal";
import { Sidebar } from "./Sidebar"; // Pastikan path dan importnya sesuai
import {
  useArtikelDetail,
  useArtikelKomentar, // <-- IMPORT BARU: Untuk mengambil daftar komentar
  postLike,
  postKomentar,
} from "../../../../components/features/public/artikel/UseArticle";
import { getToken } from "../../../../utils/storage";

const ArticleDetailPage = () => {
  const { id } = useParams();

  // ── Auth: cek token & Sidebar State ──────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false); // <-- STATE BARU: Mengontrol laci komentar

  // Re-check login state setiap kali modal ditutup
  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, [showLoginModal]);

  // ── Fetch artikel detail & daftar komentar ───────────────────────
  const { artikel, loading, error } = useArtikelDetail(id);
  const { komentar: fetchedKomentar, refetch: refetchKomentar } = useArtikelKomentar(id); // <-- AMBIL DATA KOMENTAR

  // ── Like state ───────────────────────────────────────────────────
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    if (artikel) setLikesCount(artikel.jumlah_likes ?? 0);
  }, [artikel]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const result = await postLike(id);
      setIsLiked(result.liked);
      setLikesCount(result.jumlah_likes);
    } catch (err) {
      if (err.message === "not_authenticated") setShowLoginModal(true);
      else console.error("[Like]", err.message);
    } finally {
      setLikeLoading(false);
    }
  };

  // ── Komentar state ───────────────────────────────────────────────
  const [komentarTeks, setKomentarTeks] = useState("");
  const [komentarList, setKomentarList] = useState([]);
  const [komentarLoading, setKomentarLoading] = useState(false);
  const [komentarError, setKomentarError] = useState("");

  // Sinkronisasi data komentar dari fetch API ke state lokal
  useEffect(() => {
    if (fetchedKomentar) {
      setKomentarList(fetchedKomentar);
    }
  }, [fetchedKomentar]);

  const handleKomentar = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!komentarTeks.trim()) return;
    setKomentarLoading(true);
    setKomentarError("");
    try {
      await postKomentar(id, komentarTeks.trim());
      setKomentarTeks("");
      // Setelah sukses posting, tarik ulang data komentar terbaru dari server
      refetchKomentar(); 
    } catch (err) {
      if (err.message === "not_authenticated") setShowLoginModal(true);
      else setKomentarError(err.message || "Gagal mengirim komentar.");
    } finally {
      setKomentarLoading(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="relative bg-white pt-20 pb-20 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="hidden lg:col-span-2 lg:block" />
            <main className="animate-pulse space-y-4 pt-2 lg:col-span-7">
              <div className="h-10 w-3/4 rounded-lg bg-gray-100" />
              <div className="h-10 w-1/2 rounded-lg bg-gray-100" />
              <div className="mt-4 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-100" />
                <div className="space-y-2">
                  <div className="h-3 w-32 rounded bg-gray-100" />
                  <div className="h-3 w-24 rounded bg-gray-100" />
                </div>
              </div>
              <div className="h-72 w-full rounded-2xl bg-gray-100" />
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 w-full rounded bg-gray-100" />
              ))}
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 pt-20 text-center">
        <p className="text-lg font-bold text-gray-900">
          Artikel tidak ditemukan
        </p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (!artikel) return null;

  // ── Normalisasi data dari API ────────────────────────────────────
  const penulisNama =
    artikel.penulis?.full_name ?? artikel.penulis?.username ?? "Anonim";
  const penulisAvatar =
    artikel.penulis?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(penulisNama)}&background=1e1f78&color=fff`;

  const tanggal = artikel.waktu_publish
    ? new Date(artikel.waktu_publish).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const wordCount = (artikel.konten_teks ?? "")
    .replace(/<[^>]+>/g, "")
    .split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const commentsCount = komentarList.length || artikel.jumlah_komentar || 0;

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="relative bg-white pt-20 pb-20 text-gray-900">
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Kolom kiri */}
          <div className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-30">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
                TB
              </div>
              <h3 className="font-bold text-gray-900">Torang Bersih</h3>
              <p className="mt-2 text-xs text-gray-500">
                Platform Komunitas Persampahan Sulut.
              </p>
            </div>
          </div>

          {/* Kolom tengah */}
          <main className="pt-2 lg:col-span-7">
            <header className="mb-8">
              <h1 className="mb-6 text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                {artikel.judul_artikel}
              </h1>
              <div className="flex items-center gap-4">
                <img
                  src={penulisAvatar}
                  alt={penulisNama}
                  className="h-10 w-10 rounded-full border border-gray-100"
                />
                <div className="text-sm">
                  <p className="font-bold text-gray-900">{penulisNama}</p>
                  <p className="text-gray-500">
                    {readTime} menit baca · {tanggal}
                  </p>
                </div>
              </div>
            </header>

            {/* Like & Comment Buttons Section */}
            <div className="mb-8 flex items-center border-y border-gray-100 py-3 gap-6">
              {/* Tombol Like */}
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-2 transition-all disabled:opacity-60 ${
                  isLiked
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <svg
                  className={`h-6 w-6 ${isLiked ? "fill-current" : "fill-none"}`}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="text-sm font-medium">{likesCount}</span>
              </button>

              {/* Tombol Komentar Baru (Buka Drawer) */}
              <button
                onClick={() => setIsCommentOpen(true)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-all"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">{commentsCount}</span>
              </button>
            </div>

            {/* Konten artikel */}
            <article className="prose prose-lg max-w-none leading-relaxed text-gray-800">
              {artikel.foto_cover_url && (
                <img
                  src={artikel.foto_cover_url}
                  className="mb-10 w-full rounded-2xl shadow-lg"
                  alt={artikel.judul_artikel}
                />
              )}
              <div
                dangerouslySetInnerHTML={{ __html: artikel.konten_teks ?? "" }}
              />
            </article>
          </main>

          {/* Sidebar kanan — Menyuplai state dan props drawer */}
          <div className="sticky top-30 h-fit lg:col-span-3">
            <Sidebar
              isLoggedIn={isLoggedIn}
              openModal={() => setShowLoginModal(true)}
              comments={komentarList}
              commentsCount={commentsCount}
              komentarTeks={komentarTeks}
              onKomentarChange={(e) => setKomentarTeks(e.target.value)}
              onKomentarSubmit={handleKomentar}
              komentarLoading={komentarLoading}
              komentarError={komentarError}
              popularArticles={[]}
              topics={[]}
              
              // TIGA PROP INI YANG MEMBUAT DRAWER BEKERJA
              isDetail={true}
              isCommentOpen={isCommentOpen}
              onCloseComment={() => setIsCommentOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;