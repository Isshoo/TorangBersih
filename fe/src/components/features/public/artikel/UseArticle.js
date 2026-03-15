/**
 * useArtikel.js
 * Custom hook & helper function untuk semua endpoint artikel.
 *
 * Endpoint (sesuai file .bru):
 *
 *  GET    /api/artikel
 *         ?search=&sort_by=created_at&sort_order=desc&page=1&per_page=20
 *         auth: none (publik)
 *
 *  GET    /api/artikel/:item_id
 *         auth: none (publik)
 *
 *  GET    /api/artikel/my-artikel
 *         ?page=1&per_page=20&search=&sort_by=created_at&sort_order=desc
 *         auth: bearer (wajib login)
 *
 *  POST   /api/artikel
 *         body: { judul_artikel, kategori_id, konten_teks, foto_cover_url, status_publikasi }
 *         auth: bearer (wajib login)
 *
 *  PUT    /api/artikel/:item_id
 *         body: { ...fields yang ingin diubah }
 *         auth: bearer (wajib login)
 *
 *  DELETE /api/artikel/:item_id
 *         auth: bearer (wajib login)
 *
 * Catatan: endpoint /like dan /komentar tidak ada di .bru,
 * tetapi dipertahankan dari versi sebelumnya karena dipakai di ArticleDetailPage.
 */

import { useState, useEffect, useCallback } from "react";
import { getToken } from "../../../../utils/storage";
// Tambahkan import toaster 
import { toast } from "react-hot-toast";

const BASE_URL = "http://127.0.0.1:5000";

// ─── Helper: build Authorization header ────────────────────────────
function authHeaders(required = false) {
  const token = getToken();
  if (required && !token) throw new Error("not_authenticated");
  const h = { "Content-Type": "application/json", Accept: "application/json" };
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

// ─── normalizeArtikel: API item → ArticleCard props ────────────────
export function normalizeArtikel(item) {
  return {
    id:    item.id,
    slug:  item.slug,
    title: item.judul_artikel,
    // konten_teks tidak dikembalikan di list endpoint, pakai "" sebagai default
    excerpt:     item.konten_teks ?? "",
    image:       item.foto_cover_url ?? "",
    category:    item.kategori?.nama ?? item.kategori ?? "",
    author:
      item.penulis?.full_name ??
      item.penulis?.username ??
      "Anonim",
    authorImage:
      item.penulis?.avatar_url ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        item.penulis?.full_name ?? "A"
      )}&background=1e1f78&color=fff`,
    date: item.waktu_publish
      ? new Date(item.waktu_publish).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-",
    views:    item.jumlah_views    ?? 0,
    likes:    item.jumlah_likes    ?? 0,
    comments: item.jumlah_komentar ?? 0,
    status:   item.status_publikasi,
  };
}

// ══════════════════════════════════════════════════════════════════
// useArtikel
// GET /api/artikel?search=&sort_by=created_at&sort_order=desc
// auth: none (token dikirim jika ada, untuk fitur personalisasi)
// ══════════════════════════════════════════════════════════════════
/**
 * @param {string} kategori  "Semua" | "Untuk Anda" | "Edukasi" | "Berita" | "Event" | "Opini"
 * @param {number} page
 * @param {number} perPage
 * @param {string} search
 */
export function useArtikel({
  kategori = "Semua",
  page     = 1,
  perPage  = 20,
  search   = "",
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [meta,     setMeta]     = useState(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Query params sesuai .bru: sort_by, sort_order wajib ada
      // search hanya dikirim jika ada isinya (backend 422 jika value tidak valid)
      // Params sesuai Bruno yang 200 OK:
      // hanya sort_by + sort_order yang wajib
      // page/per_page & search hanya ditambah jika ada nilainya
      const params = new URLSearchParams({
        sort_by:    "created_at",
        sort_order: "desc",
      });

      if (page && page > 1)         params.append("page",     String(page));
      if (perPage && perPage !== 20) params.append("per_page", String(perPage));

      const cleanSearch = (search ?? "").trim();
      if (cleanSearch) params.append("search", cleanSearch);

      // Filter kategori hanya jika bukan "Semua" / "Untuk Anda"
      if (kategori && kategori !== "Semua" && kategori !== "Untuk Anda") {
        params.append("kategori", kategori);
      }

      const res  = await fetch(
        `${BASE_URL}/api/artikel?${params.toString()}`,
        { headers: authHeaders() }
      );
      const json = await res.json();

      if (res.ok && json.success) {
        setArticles((json.data ?? []).map(normalizeArtikel));
        setMeta(json.meta ?? null);
      } else {
        setError(json.message ?? "Gagal memuat artikel.");
        toast.error(json.message ?? "Gagal memuat artikel.");
      }
    } catch (err) {
      console.error("[useArtikel]", err);
      setError("Tidak dapat terhubung ke server.");
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }, [kategori, page, perPage, search]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { articles, loading, error, meta, refetch: fetch_ };
}

// ══════════════════════════════════════════════════════════════════
// useArtikelDetail
// GET /api/artikel/:item_id
// auth: none (token dikirim jika ada)
// ══════════════════════════════════════════════════════════════════
export function useArtikelDetail(id) {
  const [artikel,  setArtikel]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res  = await fetch(
          `${BASE_URL}/api/artikel/${id}`,
          { headers: authHeaders() }  // token opsional
        );
        const json = await res.json();

        if (res.ok && json.success) {
          setArtikel(json.data);
        } else {
          setError(json.message ?? "Artikel tidak ditemukan.");
          toast.error(json.message ?? "Artikel tidak ditemukan.");
        }
      } catch (err) {
        console.error("[useArtikelDetail]", err);
        setError("Tidak dapat terhubung ke server.");
        toast.error("Tidak dapat terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  return { artikel, loading, error };
}

// ══════════════════════════════════════════════════════════════════
// useMyArtikel
// GET /api/artikel/my-artikel?page=1&per_page=20&search=&sort_by=created_at&sort_order=desc
// auth: bearer (wajib login)
// Dipakai di halaman "Artikel Saya" / dashboard penulis
// ══════════════════════════════════════════════════════════════════
export function useMyArtikel({
  page    = 1,
  perPage = 20,
  search  = "",
} = {}) {
  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [meta,     setMeta]     = useState(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page,
        per_page:   perPage,
        sort_by:    "created_at",
        sort_order: "desc",
      });

      // search hanya dikirim jika ada keyword
      const cleanSearchMy = (search ?? "").trim();
      if (cleanSearchMy) params.append("search", cleanSearchMy);

      const res  = await fetch(
        `${BASE_URL}/api/artikel/my-artikel?${params.toString()}`,
        { headers: authHeaders(true) }  // token wajib
      );
      const json = await res.json();

      if (res.ok && json.success) {
        setArticles((json.data ?? []).map(normalizeArtikel));
        setMeta(json.meta ?? null);
      } else {
        setError(json.message ?? "Gagal memuat artikel Anda.");
        toast.error(json.message ?? "Gagal memuat artikel Anda.");
      }
    } catch (err) {
      if (err.message === "not_authenticated") {
        setError("Sesi habis. Silakan login kembali.");
        toast.error("Sesi habis. Silakan login kembali.");
      } else {
        console.error("[useMyArtikel]", err);
        setError("Tidak dapat terhubung ke server.");
        toast.error("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  }, [page, perPage, search]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { articles, loading, error, meta, refetch: fetch_ };
}

// ══════════════════════════════════════════════════════════════════
// createArtikel
// POST /api/artikel
// auth: bearer (wajib login)
// ══════════════════════════════════════════════════════════════════
/**
 * @param {{ judul_artikel, kategori_id, konten_teks, foto_cover_url, status_publikasi }} payload
 * @returns {Promise<{ success, data, message }>}
 */
export async function createArtikel(payload) {
  const res  = await fetch(`${BASE_URL}/api/artikel`, {
    method:  "POST",
    headers: authHeaders(true),  // token wajib
    body:    JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message ?? "Gagal membuat artikel.");
    throw new Error(json.message ?? "Gagal membuat artikel.");
  }
  return json;
}

// ══════════════════════════════════════════════════════════════════
// updateArtikel
// PUT /api/artikel/:item_id
// auth: bearer (wajib login)
// ══════════════════════════════════════════════════════════════════
/**
 * @param {string} id       UUID artikel
 * @param {object} payload  Field yang ingin diubah (partial update)
 * @returns {Promise<{ success, data, message }>}
 */
export async function updateArtikel(id, payload) {
  const res  = await fetch(`${BASE_URL}/api/artikel/${id}`, {
    method:  "PUT",
    headers: authHeaders(true),  // token wajib
    body:    JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message ?? "Gagal memperbarui artikel.");
    throw new Error(json.message ?? "Gagal memperbarui artikel.");
  }
  return json;
}

// ══════════════════════════════════════════════════════════════════
// deleteArtikel
// DELETE /api/artikel/:item_id
// auth: bearer (wajib login)
// ══════════════════════════════════════════════════════════════════
/**
 * @param {string} id  UUID artikel
 * @returns {Promise<{ success, message }>}
 */
export async function deleteArtikel(id) {
  const res  = await fetch(`${BASE_URL}/api/artikel/${id}`, {
    method:  "DELETE",
    headers: authHeaders(true),  // token wajib
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message ?? "Gagal menghapus artikel.");
    throw new Error(json.message ?? "Gagal menghapus artikel.");
  }
  return json;
}

// ══════════════════════════════════════════════════════════════════
// postLike — toggle like
// POST /api/artikel/:id/like  (dipertahankan dari versi sebelumnya)
// auth: bearer (wajib login)
// ══════════════════════════════════════════════════════════════════
/**
 * @returns {Promise<{ success, liked: boolean, jumlah_likes: number }>}
 */
export async function postLike(artikelId) {
  const res  = await fetch(`${BASE_URL}/api/artikel/${artikelId}/like`, {
    method:  "POST",
    headers: authHeaders(true),
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message ?? "Gagal like artikel.");
    throw new Error(json.message ?? "Gagal like artikel.");
  }
  return json;
}

// ══════════════════════════════════════════════════════════════════
// postKomentar — kirim komentar baru
// POST /api/artikel/:id/komentar  (dipertahankan dari versi sebelumnya)
// auth: bearer (wajib login)
// ══════════════════════════════════════════════════════════════════
export async function postKomentar(artikelId, teks) {
  const res  = await fetch(`${BASE_URL}/api/artikel/${artikelId}/komentar`, {
    method:  "POST",
    headers: authHeaders(true),
    body:    JSON.stringify({ teks }),
  });
  const json = await res.json();
  if (!res.ok) {
    toast.error(json.message ?? "Gagal mengirim komentar.");
    throw new Error(json.message ?? "Gagal mengirim komentar.");
  }
  return json;
}

// ══════════════════════════════════════════════════════════════════
// useArtikelKomentar — fetch daftar komentar
// GET /api/artikel/:id/komentar  (dipertahankan dari versi sebelumnya)
// auth: token opsional
// ══════════════════════════════════════════════════════════════════
export function useArtikelKomentar(artikelId) {
  const [komentar, setKomentar] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  const fetch_ = useCallback(async () => {
    if (!artikelId) return;
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(
        `${BASE_URL}/api/artikel/${artikelId}/komentar`,
        { headers: authHeaders() }
      );
      const json = await res.json();

      if (res.ok && json.success) {
        setKomentar(json.data ?? []);
      } else {
        setError(json.message ?? "Gagal memuat komentar.");
        toast.error(json.message ?? "Gagal memuat komentar.");
      }
    } catch (err) {
      console.error("[useArtikelKomentar]", err);
      setError("Tidak dapat terhubung ke server.");
      toast.error("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }, [artikelId]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { komentar, loading, error, refetch: fetch_ };
}