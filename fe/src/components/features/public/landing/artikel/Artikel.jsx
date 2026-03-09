import React from "react";
import ArtikelHeadline from "./ArtikelHeadline";
import ArtikelItem from "./ArtikelItem";
import { HiFire } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const Artikel = () => {
  const headline = {
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    author: "Leonardo moreno",
    authorAvatar:
      "https://ui-avatars.com/api/?name=Leonardo+Moreno&background=1e1f78&color=fff&size=64",
    title:
      "Menjawab Krisis Ruang Buang TPA Sumompo, PSEL Regional Ilo-Ilo Minut Beroperasi 2026",
    description:
      "Kota Manado menghasilkan sekitar 650 ton sampah setiap harinya yang membebani TPA Sumompo. Sebagai solusi jangka panjang, Pemerintah Provinsi Sulawesi Utara mempercepat pengoperasian Tempat Pemrosesan Akhir (TPA) Regional Mamitarang di Ilo-Ilo yang dilengkapi teknologi Pengolahan Sampah menjadi Energi Listrik (PSEL) pada tahun 2026...",
  };

  const artikelTerbaru = [
    {
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80",
      title:
        "Menjawab Krisis Ruang Buang TPA Sumompo, PSEL Regional Ilo-Ilo Minut Beroperasi 2026",
      views: 300,
      likes: 256,
      comments: 6,
    },
    {
      image:
        "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80",
      title:
        "Menjawab Krisis Ruang Buang TPA Sumompo, PSEL Regional Ilo-Ilo Minut Beroperasi 2026",
      views: 300,
      likes: 256,
      comments: 6,
    },
    {
      image:
        "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80",
      title:
        "Menjawab Krisis Ruang Buang TPA Sumompo, PSEL Regional Ilo-Ilo Minut Beroperasi 2026",
      views: 300,
      likes: 256,
      comments: 6,
    },
    {
      image:
        "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80",
      title:
        "Menjawab Krisis Ruang Buang TPA Sumompo, PSEL Regional Ilo-Ilo Minut Beroperasi 2026",
      views: 300,
      likes: 256,
      comments: 6,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="flex w-full justify-center px-4 py-16 md:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        {/* Section Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Berita & Artikel
          </h2>
          <p className="max-w-2xl text-lg leading-7 font-medium text-gray-500">
            Informasi terkini seputar pengelolaan sampah dan lingkungan di
            Sulawesi Utara.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
          {/* Kolom Kiri — Headline */}
          <div className="w-full lg:w-[55%]">
            <ArtikelHeadline {...headline} />
          </div>

          {/* Kolom Kanan — Terbaru */}
          <div className="flex w-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-[0px_2px_15px_2px_rgba(0,0,0,0.1)] lg:w-[45%]">
            {/* Header Terbaru */}
            <div className="flex items-center gap-2">
              <HiFire className="text-3xl text-(--cyan)" />
              <h3 className="text-2xl font-semibold tracking-tight text-(--dark)">
                Terbaru
              </h3>
            </div>

            {/* List Artikel */}
            <div className="flex flex-col gap-5">
              {artikelTerbaru.map((item, index) => (
                <ArtikelItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Artikel;
