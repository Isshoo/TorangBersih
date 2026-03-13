import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../../../utils/storage";
import { RiPencilLine, RiSearchLine } from "react-icons/ri";

/**
 * Sidebar.jsx
 *
 * Perubahan:
 *  - Tambah tombol "Tulis Artikel" di atas sidebar normal
 *    → jika login: tombol langsung ke /artikel/buat
 *    → jika belum login: card ajakan dengan tombol "Masuk untuk Menulis"
 *
 * z-index drawer:
 *  - Overlay : z-[9998]
 *  - Panel   : z-[9999]
 */
export const Sidebar = ({
  popularArticles,
  topics,
  openModal,
  comments = [],
  commentsCount = 0,
  komentarTeks = "",
  onKomentarChange = () => {},
  onKomentarSubmit = () => {},
  komentarLoading = false,
  komentarError = "",
  isDetail = false,
  isCommentOpen = false,
  onCloseComment = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  onTagClick = () => {},
}) => {
  const isLoggedIn = !!getToken();
  const navigate = useNavigate();

  return (
    <>
      {!isDetail ? (
        <aside className="hidden h-fit border-l border-gray-100 pl-8 lg:block">
          <div className="w-full">
            {/* ── Tombol Tulis Artikel ── */}
            {isLoggedIn ? (
              <div className="mb-5">
                <Link
                  to="/artikel/buat"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1e1f78] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1a1b65] active:scale-[0.98]"
                >
                  <RiPencilLine className="h-4 w-4" />
                  Tulis Artikel
                </Link>
              </div>
            ) : (
              <div className="mb-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center">
                <p className="mb-3 text-sm leading-relaxed text-gray-500">
                  Punya cerita seputar lingkungan? Yuk bagikan!
                </p>
                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1e1f78] px-4 py-2.5 text-sm font-semibold text-[#1e1f78] transition-all hover:bg-[#1e1f78] hover:text-white"
                >
                  <RiPencilLine className="h-4 w-4" />
                  Masuk untuk Menulis
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="mb-5 h-px bg-gray-100" />

            {/* ── Search Bar ── */}
            <div className="mb-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={onSearchChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 text-sm transition-all outline-none placeholder:text-gray-400 focus:border-[#1e1f78] focus:bg-white focus:ring-1 focus:ring-[#1e1f78]"
                />
                <RiSearchLine className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            {/* ── Topik yang Sama ── */}
            {popularArticles && popularArticles.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-5 flex items-center gap-2 text-base font-bold text-gray-900">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Artikel Populer
                </h3>
                <div className="flex flex-col gap-5">
                  {popularArticles.map((item, idx) => {
                    const authorName =
                      item.penulis?.full_name ||
                      item.penulis?.username ||
                      "Penulis";
                    const dateStr = new Date(
                      item.created_at,
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    return (
                      <div
                        key={item.id}
                        onClick={() => navigate(`/artikel/${item.id}`)}
                        className="group flex cursor-pointer items-start gap-3"
                      >
                        <div className="mt-0.5 shrink-0">
                          <span className="text-2xl font-black text-gray-200 transition-colors group-hover:text-blue-500">
                            0{idx + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="mb-1.5 line-clamp-2 text-sm leading-snug font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                            {item.judul_artikel}
                          </h4>
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                item.penulis?.avatar_url ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random&size=24`
                              }
                              alt={authorName}
                              className="h-4 w-4 rounded-full object-cover shadow-sm"
                            />
                            <span className="text-[11px] font-medium text-gray-500">
                              {authorName} <span className="mx-0.5">•</span>{" "}
                              {dateStr}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Jelajahi Topik ── */}
            {topics && topics.length > 0 && (
              <div className="mb-10">
                <h3 className="mb-4 text-base font-bold text-gray-900">
                  # Tag Populer
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => onTagClick(topic)}
                      className="rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      ) : (
        <>
          {/* Overlay — z-[9998] */}
          <div
            className={`fixed inset-0 z-9998 bg-black/5 transition-opacity duration-300 ${
              isCommentOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
            onClick={onCloseComment}
          />

          {/* Panel — z-[9999] */}
          <div
            className={`fixed top-0 right-0 z-9999 h-full w-full max-w-[400px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
              isCommentOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Responses ({commentsCount})
                </h2>
                <svg
                  onClick={onCloseComment}
                  className="h-6 w-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Input komentar */}
                {isLoggedIn ? (
                  <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all focus-within:border-gray-400 focus-within:shadow-md">
                    <div className="mb-3 flex items-center gap-3">
                      <img
                        src="https://ui-avatars.com/api/?name=Anda&background=random&size=32"
                        alt="Anda"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        Anda
                      </span>
                    </div>
                    <textarea
                      value={komentarTeks}
                      onChange={onKomentarChange}
                      disabled={komentarLoading}
                      className="min-h-[80px] w-full resize-none border-none text-sm text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none disabled:opacity-60"
                      placeholder="What are your thoughts?"
                    />
                    {komentarError && (
                      <p className="mb-2 text-xs font-medium text-red-500">
                        {komentarError}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between pt-2">
                      <div className="flex gap-3 text-gray-400">
                        <button className="font-serif text-lg font-bold hover:text-gray-700">
                          B
                        </button>
                        <button className="font-serif text-lg italic hover:text-gray-700">
                          i
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={onCloseComment}
                          className="text-sm font-medium text-gray-500 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onKomentarSubmit}
                          disabled={komentarLoading || !komentarTeks.trim()}
                          className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                          {komentarLoading ? "..." : "Respond"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={openModal}
                    className="group mb-8 cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all hover:border-gray-300"
                  >
                    <p className="mb-4 text-sm font-medium text-gray-600 group-hover:text-gray-800">
                      Log in to leave a response.
                    </p>
                    <Link
                      to="/login"
                      className="inline-block w-full rounded-full bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700"
                    >
                      Login
                    </Link>
                  </div>
                )}

                {/* Sort */}
                {comments.length > 0 && (
                  <div className="mb-6 flex items-center border-b border-gray-100 pb-4">
                    <span className="cursor-pointer text-xs font-bold tracking-wide text-gray-900 uppercase transition-colors hover:text-gray-600">
                      Most Relevant <span className="ml-1 text-[10px]">▼</span>
                    </span>
                  </div>
                )}

                {/* List komentar */}
                <div className="space-y-8">
                  {comments.map((c, i) => {
                    const nama =
                      c.user?.full_name ??
                      c.user?.username ??
                      (typeof c.user === "string" ? c.user : "Anonim");
                    const avatarUrl =
                      c.user?.avatar_url ??
                      c.userImage ??
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(nama)}&background=random&size=32`;
                    const teks = c.teks ?? c.text ?? "";
                    return (
                      <div key={c.id ?? i} className="group">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={avatarUrl}
                              alt={nama}
                              className="h-8 w-8 rounded-full object-cover shadow-sm"
                            />
                            <div>
                              <p className="text-[13px] font-bold text-gray-900">
                                {nama}
                              </p>
                              <p className="text-[11px] font-medium text-gray-500">
                                Baru saja
                              </p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-700">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[14px] leading-relaxed text-gray-800">
                          {teks}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3 text-gray-400">
                          <div className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-gray-700">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            <span className="text-[12px] font-medium">0</span>
                          </div>
                          <span className="cursor-pointer text-[12px] font-medium transition-colors hover:text-gray-700">
                            Reply
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
