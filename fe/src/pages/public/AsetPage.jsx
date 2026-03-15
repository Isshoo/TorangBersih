import React from "react";
import FiturHero from "../../components/shared/FiturHero";
import DaftarAset from "../../components/features/public/aset/DaftarAset";

const AsetPage = () => {
  return (
    // Tambahkan overflow-x-hidden di sini!
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-[#FAFAFA] selection:bg-(--gray-shine) selection:text-(--primary)">
      <div className="relative z-0">
        <FiturHero
          title="Temukan Aset Daur Ulang di Sekitarmu"
          description="Jelajahi peta interaktif yang memuat lokasi Bank Sampah, TPST, TPA, dan sentra kompos di seluruh Sulawesi Utara. Salurkan sampahmu ke tempat yang tepat."
          buttonText="Daftarkan Aset"
          buttonLink="/aset/daftar"
        />
      </div>

      <div className="relative z-20">
        <DaftarAset />
      </div>
    </div>
  );
};

export default AsetPage;