import React, { useState } from "react";
import ArticleCard from "../../components/features/public/artikel/articleCard";
import Sidebar from "../../components/features/public/artikel/Sidebar";

import { useArtikel } from "../../components/features/public/artikel/UseArticle"; // sesuaikan path jika berbeda

// ── Tab config ──────────────────────────────────────────────────
const TAB_LIST = ["Untuk Anda", "Edukasi", "Berita", "Event", "Opini"];

// ── Loading skeleton (tidak ubah desain, hanya filler) ─────────
function ArticleSkeleton() {
  return (
    <div className="flex animate-pulse flex-col-reverse gap-6 border-b border-gray-100 py-8 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="h-3 w-32 rounded bg-gray-100" />
        <div className="h-5 w-3/4 rounded bg-gray-100" />
        <div className="h-5 w-1/2 rounded bg-gray-100" />
        <div className="h-3 w-1/4 rounded bg-gray-100" />
      </div>
      <div className="h-40 w-full shrink-0 rounded-md bg-gray-100 sm:h-32 sm:w-32 md:w-48" />
    </div>
  );
}

// ── Error state ─────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-base font-bold text-gray-900">Gagal memuat artikel</p>
      <p className="text-sm text-gray-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-full bg-gray-900 px-5 py-2 text-sm font-bold text-white hover:bg-black"
      >
        Coba Lagi
      </button>
    </div>
  );
}

// ── Pagination controls ─────────────────────────────────────────
function Pagination({ meta, page, onPage }) {
  if (!meta?.pagination) return null;
  const { has_prev, has_next, total_pages } = meta.pagination;
  if (total_pages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={!has_prev}
        onClick={() => onPage(page - 1)}
        className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <span className="text-sm text-gray-500">
        Halaman {page} dari {total_pages}
      </span>
      <button
        type="button"
        disabled={!has_next}
        onClick={() => onPage(page + 1)}
        className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Berikutnya
      </button>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────
const ArtikelPage = () => {
  const [activeTab, setActiveTab] = useState("Untuk Anda");
  const [page, setPage] = useState(1);

  // Fetch dari backend — reset ke page 1 saat tab berubah
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const { articles, loading, error, meta, refetch } = useArtikel({
    kategori: activeTab,
    page,
  });

  // Sidebar data (static — belum ada endpoint populer/topik)
  const popularArticles = [
    {
      id: 101,
      author: "Anita R.",
      title: "Perbedaan Sampah Residu dan Daur Ulang",
      date: "5 Sep",
    },
    {
      id: 102,
      author: "Budi Santoso",
      title: "5 Tips Mengurangi Pemakaian Plastik",
      date: "22 Ags",
    },
  ];
  const topics = ["Plastik", "Kompos", "Bank Sampah", "Laut", "Relawan"];

  return (
    <div className="bg-white pt-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* ── Konten utama ── */}
          <div className="lg:col-span-8">
            {/* Tab bar — tidak diubah */}
            <div className="scrollbar-hide mb-8 flex overflow-x-auto border-b border-gray-200">
              {TAB_LIST.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`relative px-4 pb-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-t-md bg-gray-900" />
                  )}
                </button>
              ))}
            </div>

            {/* ── Loading ── */}
            {loading && (
              <div className="flex flex-col">
                {[...Array(3)].map((_, i) => (
                  <ArticleSkeleton key={i} />
                ))}
              </div>
            )}

            {/* ── Error ── */}
            {!loading && error && (
              <ErrorState message={error} onRetry={refetch} />
            )}

            {/* ── Empty ── */}
            {!loading && !error && articles.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <p className="text-base font-bold text-gray-900">
                  Belum ada artikel
                </p>
                <p className="text-sm text-gray-500">
                  Belum ada artikel di kategori ini.
                </p>
              </div>
            )}

            {/* ── Daftar artikel — markup sama persis ── */}
            {!loading && !error && articles.length > 0 && (
              <>
                <div className="flex flex-col">
                  {articles.map((item) => (
                    <ArticleCard
                      key={item.id}
                      article={{
                        id: item.id,
                        slug: item.slug,
                        title: item.title,
                        author: item.author,
                        authorImage: item.authorImage,
                        category: item.category,
                        date: item.date,
                        likes: item.likes,
                        comments: item.comments,
                        excerpt: item.excerpt,
                        image: item.image,
                        views: item.views,
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination meta={meta} page={page} onPage={setPage} />
              </>
            )}
          </div>

          {/* ── Sidebar — tidak diubah ── */}
          <div className="sticky top-24 hidden h-fit lg:col-span-4 lg:block">
            <Sidebar
              popularArticles={popularArticles}
              topics={topics}
              isDetail={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelPage;
