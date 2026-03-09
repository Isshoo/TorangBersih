import React, { useState } from "react";
import LoginModal from "../../../common/LoginModal";
import SidebarArticle from "./Sidebar";

const ArticleDetailPage = () => {
  // --- AUTH STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set true untuk testing login
  const [showLoginModal, setShowLoginModal] = useState(false);
  console.log(setIsLoggedIn);
  // --- ARTIKEL STATE ---
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1240);

  // Fungsi Like dengan proteksi modal
  const handleLike = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const article = {
    title: "Membangun Ekosistem Bank Sampah Skala RT yang Efektif",
    author: "Benny Lantang",
    authorImage:
      "https://ui-avatars.com/api/?name=Benny+Lantang&background=00A9E0&color=fff",
    date: "24 Okt 2025",
    readTime: "5 menit baca",
    commentsCount: 17,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
  };

  const dummyComments = [
    {
      id: 1,
      user: "Rahul Saini",
      userImage: "https://ui-avatars.com/api/?name=Rahul+Saini",
      text: "Langkah yang sangat inspiratif!",
    },
    {
      id: 2,
      user: "Rina Wulandari",
      userImage: "https://ui-avatars.com/api/?name=Rina+Wulandari",
      text: "Kapan ada workshopnya lagi?",
    },
  ];

  return (
    <div className="relative bg-white pt-20 pb-20 text-gray-900">
      {/* 1. Modal diletakkan di level atas agar overlay-nya sempurna */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* KOLOM KIRI (Profil Publikasi) */}
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

          {/* KOLOM TENGAH (Konten Utama) */}
          {/* KOLOM TENGAH (Konten Utama) */}
          <main className="pt-2 lg:col-span-7">
            <header className="mb-8">
              <h1 className="mb-6 text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                {article.title}
              </h1>
              <div className="flex items-center gap-4">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="h-10 w-10 rounded-full border border-gray-100"
                />
                <div className="text-sm">
                  <p className="font-bold text-gray-900">{article.author}</p>
                  <p className="text-gray-500">
                    {article.readTime} · {article.date}
                  </p>
                </div>
              </div>
            </header>

            {/* Like Button Section */}
            <div className="mb-8 flex items-center justify-between border-y border-gray-100 py-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-all ${isLiked ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}`}
              >
                <svg
                  className={`h-6 w-6 ${isLiked ? "fill-current" : "fill-none"}`}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  ></path>
                </svg>
                <span className="text-sm font-medium">{likesCount}</span>
              </button>
            </div>

            {/* ISI ARTIKEL DETAIL */}
            <article className="prose prose-lg max-w-none leading-relaxed text-gray-800">
              <img
                src={article.image}
                className="mb-10 w-full rounded-2xl shadow-lg"
                alt="Hero Bank Sampah"
              />

              <p className="mb-8 border-l-4 border-blue-500 pl-6 text-xl leading-relaxed text-gray-600 italic">
                "Perubahan besar tidak dimulai dari kebijakan pemerintah pusat
                saja, melainkan dari pemilahan sampah di dapur-dapur warga
                sendiri."
              </p>

              <p className="mb-6">
                Masalah sampah di wilayah perkotaan Sulawesi Utara, khususnya
                Manado, terus menjadi tantangan serius seiring meningkatnya
                konsumsi rumah tangga.
                <strong> Bank Sampah skala RT</strong> hadir sebagai solusi
                desentralisasi yang paling efektif karena menyentuh langsung
                sumber timbulan sampah.
              </p>

              <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
                Kenapa Harus Skala RT?
              </h2>
              <p className="mb-6">
                Skala RT memungkinkan adanya kontrol sosial dan kedekatan
                emosional antar tetangga. Proses edukasi mengenai perbedaan
                sampah organik, residu, dan sampah bernilai ekonomis (daur
                ulang) jauh lebih mudah diterima dalam lingkungan kecil melalui
                diskusi santai di teras rumah.
              </p>

              <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900">
                3 Langkah Memulai Bank Sampah RT
              </h2>
              <ol className="mb-8 list-decimal space-y-4 pl-6 text-gray-700">
                <li>
                  <strong>Sosialisasi & Komitmen:</strong> Kumpulkan setidaknya
                  5-10 kepala keluarga yang bersedia memilah sampah plastik,
                  kertas, dan logam.
                </li>
                <li>
                  <strong>Tentukan Lokasi Penampungan:</strong> Tidak perlu
                  lahan luas; sebuah garasi kecil atau area sisa di sudut
                  lingkungan cukup untuk menjadi titik pengumpulan mingguan.
                </li>
                <li>
                  <strong>Gunakan Sistem Digital:</strong> Manfaatkan platform
                  seperti <em>Torang Bersih</em> untuk mencatat riwayat setoran
                  dan memantau dampak lingkungan yang dihasilkan.
                </li>
              </ol>

              <div className="my-10 rounded-2xl border border-blue-100 bg-blue-50 p-8">
                <h3 className="mb-2 text-lg font-bold text-blue-900">
                  💡 Tips Pro:
                </h3>
                <p className="text-sm leading-relaxed text-blue-800">
                  Jangan langsung menjual sampah ke pengepul besar. Coba
                  kolaborasi dengan pengrajin lokal di fitur "Marketplace" kami
                  untuk memberikan nilai tambah pada barang bekas Anda.
                </p>
              </div>

              <p className="mb-6">
                Kesuksesan ekosistem ini bergantung pada konsistensi. Mari kita
                jadikan Sulawesi Utara sebagai provinsi teladan dalam
                pengelolaan sampah mandiri. Mulailah hari ini, mulai dari RT
                Anda sendiri.
              </p>
            </article>
          </main>

          <div className="sticky top-30 h-fit lg:col-span-3">
            <SidebarArticle
              isLoggedIn={isLoggedIn}
              openModal={() => setShowLoginModal(true)}
              comments={dummyComments}
              commentsCount={article.commentsCount}
              popularArticles={[]}
              topics={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
