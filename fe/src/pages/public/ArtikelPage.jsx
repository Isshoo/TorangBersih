import React, { useState } from "react";
import ArticleCard from "../../components/features/public/artikel/articleCard";
import Sidebar from "../../components/features/public/artikel/Sidebar";

const ArtikelPage = () => {
 
  const [activeTab, setActiveTab] = useState("Untuk Anda");
  const tabList = ["Untuk Anda", "Edukasi", "Berita", "Event", "Opini"];

  const articlesFromDB = [
    {
      id: 1,
      id_penulis: 101,
      judul_artikel: "Membangun Ekosistem Bank Sampah Skala RT yang Efektif",
      slug: "membangun-ekosistem-bank-sampah-rt",
      kategori: "Edukasi", 
      konten_teks: "Panduan praktis langkah demi langkah untuk mengorganisir warga di lingkungan Anda agar mau memilah sampah dari rumah.", // Cuplikan teks
      foto_cover_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80",
      status_publikasi: "Published",
      jumlah_views: 2450,
      waktu_publish: "24 Okt 2025", 
      
      
      penulis_nama: "Trash Hero Manado",
      penulis_avatar: "https://ui-avatars.com/api/?name=Trash+Hero&background=4CAF50&color=fff",
      jumlah_likes: 1240, 
      jumlah_komentar: 45
    },
    {
      id: 2,
      id_penulis: 102,
      judul_artikel: "Dampak Sampah Plastik Terhadap Biota Laut Bunaken",
      slug: "dampak-sampah-plastik-biota-laut-bunaken",
      kategori: "Berita", // Sesuai ENUM
      konten_teks: "Penelitian terbaru menunjukkan mikroplastik mulai mengancam terumbu karang. Apa yang bisa kita lakukan sebagai warga?",
      foto_cover_url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80",
      status_publikasi: "Published",
      jumlah_views: 1850,
      waktu_publish: "18 Okt 2025",
      
      penulis_nama: "Dinas Lingkungan Hidup",
      penulis_avatar: "https://ui-avatars.com/api/?name=DLH&background=002D56&color=fff",
      jumlah_likes: 850,
      jumlah_komentar: 12
    },
    {
      id: 3,
      id_penulis: 103,
      judul_artikel: "Jadwal Bersih-Bersih Pantai Malalayang Akhir Pekan Ini",
      slug: "jadwal-bersih-pantai-malalayang",
      kategori: "Event", // Sesuai ENUM
      konten_teks: "Mari bergabung bersama ratusan relawan lainnya untuk membersihkan pesisir pantai. Bawa botol minum sendiri ya!",
      foto_cover_url: "https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc5?auto=format&fit=crop&w=400&q=80",
      status_publikasi: "Published",
      jumlah_views: 920,
      waktu_publish: "15 Okt 2025",
      
      penulis_nama: "Komunitas Laut Bersih",
      penulis_avatar: "https://ui-avatars.com/api/?name=KLB&background=00A9E0&color=fff",
      jumlah_likes: 420,
      jumlah_komentar: 8
    }
  ];

  const popularArticles = [
    { id: 101, author: "Anita R.", title: "Perbedaan Sampah Residu dan Daur Ulang", date: "5 Sep" },
    { id: 102, author: "Budi Santoso", title: "5 Tips Mengurangi Pemakaian Plastik", date: "22 Ags" }
  ];

  const topics = ["Plastik", "Kompos", "Bank Sampah", "Laut", "Relawan"];

  const filteredArticles = activeTab === "Untuk Anda" 
    ? articlesFromDB 
    : articlesFromDB.filter(a => a.kategori === activeTab);

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
         
          <div className="lg:col-span-8">
       
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
              {tabList.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-4 text-sm font-medium whitespace-nowrap relative transition-colors ${
                    activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 rounded-t-md"></span>}
                </button>
              ))}
            </div>

           
            <div className="flex flex-col">
              {filteredArticles.map((item) => (
                <ArticleCard 
                  key={item.id} 
                  article={{
                    id: item.id,
                    slug: item.slug,
                    title: item.judul_artikel,
                    author: item.penulis_nama,
                    authorImage: item.penulis_avatar,
                    category: item.kategori,
                    date: item.waktu_publish,
                    likes: item.jumlah_likes,
                    comments: item.jumlah_komentar,
                    excerpt: item.konten_teks,
                    image: item.foto_cover_url,
                    views: item.jumlah_views
                  }} 
                />
              ))}
            </div>
          </div>

       
          <div className="hidden lg:block lg:col-span-4 sticky top-24 h-fit">
            <Sidebar popularArticles={popularArticles} topics={topics} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArtikelPage;