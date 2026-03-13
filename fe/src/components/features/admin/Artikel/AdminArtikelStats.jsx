// components/features/admin/artikel/AdminArtikelStats.jsx
import React from "react";
import {
  RiFileTextLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiLineChartLine,
} from "react-icons/ri";
import StatsCard from "../../../ui/StatsCard";

const AdminArtikelStats = ({ meta, articles }) => {
  const stats = [
    {
      title: "Total Artikel",
      value: meta?.total || 0,
      icon: RiFileTextLine,
      colorVar: "--primary",
      subtitle: "Semua waktu",
    },
    {
      title: "Dipublikasikan",
      value: articles.filter((a) => a.status_publikasi === "published").length || 0,
      icon: RiCheckboxCircleLine,
      colorVar: "--cyan",
      subtitle: "Artikel terbit",
    },
    {
      title: "Menunggu Verifikasi",
      value: articles.filter((a) => a.status_publikasi === "draft").length || 0,
      icon: RiTimeLine,
      colorVar: "--accent",
      subtitle: "Perlu review",
    },
    {
      title: "Total Views",
      value: "12.4K",
      icon: RiLineChartLine,
      colorVar: "--accent-dark",
      trend: "+12%",
      subtitle: "Bulan ini",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AdminArtikelStats;