import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiPencilLine,
  RiNotification3Line,
  RiUserLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiArticleLine,
  RiDashboardLine,
} from "react-icons/ri";

/**
 * HeaderAuth.jsx
 * Bagian kanan navbar:
 *  - Belum login  : tombol Masuk + Daftar
 *  - Sudah login  : tombol "Tulis Artikel" + notifikasi + avatar dropdown
 *
 * Tombol "Tulis Artikel" sengaja diletakkan di navbar agar selalu
 * terlihat di semua halaman setelah user login — ini pola standar
 * Medium, Hashnode, dan Dev.to.
 */
const HeaderAuth = ({ isAuthenticated, user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Belum login ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          to="/login"
          className="rounded-full px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Masuk
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-[#1e1f78] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a1b65]"
        >
          Daftar
        </Link>
      </div>
    );
  }

  // ── Sudah login ──────────────────────────────────────────────
  const avatarUrl =
    user?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name ?? user?.username ?? "U")}&background=1e1f78&color=fff&size=80`;

  return (
    <div className="hidden items-center gap-2 md:flex">
      {/* ── Tombol Tulis Artikel ── */}
      <Link
        to="/artikel/buat"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-[#1e1f78] hover:text-[#1e1f78]"
      >
        <RiPencilLine className="h-4 w-4" />
        Tulis Artikel
      </Link>

      {/* ── Notifikasi ── */}
      <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
        <RiNotification3Line className="h-5 w-5" />
        {/* Badge notifikasi — sembunyikan jika tidak ada */}
        {/* <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" /> */}
      </button>

      {/* ── Avatar + Dropdown ── */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-[#1e1f78]"
        >
          <img
            src={avatarUrl}
            alt={user?.full_name ?? "Profil"}
            className="h-full w-full object-cover"
          />
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute top-11 right-0 z-[200] w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            {/* Info user */}
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="truncate text-sm font-bold text-gray-900">
                {user?.full_name ?? user?.username ?? "Pengguna"}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.email ?? ""}
              </p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <DropItem
                to="/dashboard"
                icon={<RiDashboardLine className="h-4 w-4" />}
                label="Dashboard Saya"
                onClick={() => setDropdownOpen(false)}
              />
              <DropItem
                to="/artikel/saya"
                icon={<RiArticleLine className="h-4 w-4" />}
                label="Artikel Saya"
                onClick={() => setDropdownOpen(false)}
              />
              <DropItem
                to="/artikel/buat"
                icon={<RiPencilLine className="h-4 w-4" />}
                label="Tulis Artikel Baru"
                highlight
                onClick={() => setDropdownOpen(false)}
              />
              <DropItem
                to="/profil"
                icon={<RiUserLine className="h-4 w-4" />}
                label="Profil Saya"
                onClick={() => setDropdownOpen(false)}
              />
              <DropItem
                to="/pengaturan"
                icon={<RiSettings3Line className="h-4 w-4" />}
                label="Pengaturan"
                onClick={() => setDropdownOpen(false)}
              />
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout?.();
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <RiLogoutBoxRLine className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper item dropdown
const DropItem = ({ to, icon, label, onClick, highlight }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
      highlight
        ? "text-[#1e1f78] hover:bg-[#1e1f78]/5"
        : "text-gray-700 hover:bg-gray-50"
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default HeaderAuth;
