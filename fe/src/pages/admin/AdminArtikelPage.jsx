// components/features/admin/artikel/AdminArtikelPage.jsx
import React, { useState, useEffect } from "react";
import { RiAddLine, RiDashboardLine } from "react-icons/ri";
import { BASE_URL, getToken } from "../../utils/ArtikelHelpers";
import AdminArtikelStats from "../../components/features/admin/Artikel/AdminArtikelStats";
import AdminArtikelTable from "../../components/features/admin/Artikel/AdminArtikelTabel";
import AdminArtikelDeleteModal from "../../components/features/admin/Artikel/AdminArtikelDeleteModal";

const AdminArtikelPage = () => {
  // --- States ---
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  // --- Fetch Data ---
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        per_page: 10,
        search,
        sort_by: "created_at",
        sort_order: "desc",
      });

      const res = await fetch(`${BASE_URL}/api/artikel?${params.toString()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setArticles(json.data);
        setMeta(json.meta);
      }
    } catch (err) {
      console.error("Gagal memuat artikel admin", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, search]);

  // --- Handlers ---
  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      const res = await fetch(`${BASE_URL}/api/artikel/${deleteModal.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setDeleteModal({ show: false, id: null });
        fetchArticles();
      }
    } catch {
      alert("Gagal menghapus artikel.");
    }
  };

  const handleView = (item) => {
    window.open(`/artikel/${item.id}`, "_blank");
  };

  const handleEdit = (item) => {
    window.location.href = `/admin/artikel/edit/${item.id}`;
  };

  const handleDeleteClick = (item) => {
    setDeleteModal({ show: true, id: item.id });
  };

  return (
    <div className="min-h-screen space-y-8 sm:p-8">
      {/* ── HEADER ── */}
      <div className="mx-auto mb-10 max-w-7xl">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center">
          <div>
            <h1
              className="text-3xl font-black tracking-tight"
              style={{ color: "var(--dark-text)" }}
            >
              Manajemen Artikel
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--gray-muted)" }}>
              Kelola konten, verifikasi tulisan warga, dan publikasi.
            </p>
          </div>
          <button
            className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold shadow-lg transition-all"
            style={{
              backgroundColor: "var(--primary)",
              color: "#ffffff",
              boxShadow:
                "0 10px 40px -10px color-mix(in srgb, var(--primary) 20%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-dark)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary)")
            }
          >
            <RiAddLine size={20} />
            Buat Artikel Baru
          </button>
        </div>

        <AdminArtikelStats meta={meta} articles={articles} />
      </div>

      {/* ── TABLE ── */}
      <AdminArtikelTable
        articles={articles}
        loading={loading}
        search={search}
        onSearchChange={setSearch}
        page={page}
        meta={meta}
        onPageChange={setPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* ── DELETE MODAL ── */}
      <AdminArtikelDeleteModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, id: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminArtikelPage;
