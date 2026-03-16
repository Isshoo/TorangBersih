```markdown
# Torang Bersih

**Bridging Gaps for Smart & Just Waste Management**

Aplikasi web ekosistem pengelolaan sampah digital untuk wilayah Sulawesi Utara yang mengintegrasikan crowdsourcing pelaporan, marketplace daur ulang, dan pemetaan geospasial. Platform ini dirancang untuk menjembatani kesenjangan antara warga, kolaborator pengelolaan sampah, dan pemerintah daerah melalui pendekatan teknologi yang inklusif dan berkelanjutan.

Sistem ini memungkinkan partisipasi aktif masyarakat dalam melaporkan titik sampah ilegal, memantau status penanganan secara transparan, serta terhubung dengan pelaku ekonomi sirkular melalui fitur Lapak Daur Ulang.

## Latar Belakang

Produksi sampah di Kota Manado mencapai sekitar 650 ton per hari, memberikan tekanan signifikan terhadap kapasitas Tempat Pembuangan Akhir (TPA) Sumompo. Pengelolaan sampah yang ada masih menghadapi kendala berupa keterbatasan anggaran, rendahnya kesadaran masyarakat, prasarana yang belum memadai, serta terbatasnya inovasi dalam sistem pengelolaan.

Torang Bersih hadir sebagai solusi digital yang mengadopsi prinsip Reduce, Reuse, Recycle (3R) dan ekonomi sirkular. Platform ini tidak hanya berfungsi sebagai alat pelaporan, tetapi juga sebagai infrastruktur digital alternatif yang memfasilitasi pertemuan antara penyedia sampah bernilai guna dengan pengelola, tanpa memerlukan investasi infrastruktur fisik baru.

## Fitur Utama

* **Super Map Interaktif**: Dashboard spasial dengan empat lapisan dinamis (Kolaborator, Aset Fasilitas, Laporan Aktif, Lapak Daur Ulang) yang dapat diaktifkan secara independen dengan penanda warna berbeda.
* **Laporan Sampah Cerdas**: Formulir pelaporan tiga langkah (Foto Bukti, Titik Lokasi GPS, Detail Laporan) dengan siklus status transparan dan notifikasi otomatis.
* **Lapak Daur Ulang**: Marketplace C2C dan B2C yang mengintegrasikan lokasi penjual secara spasial, memungkinkan transaksi barang bekas bernilai ekonomi langsung di komunitas.
* **Pusat Literasi Digital**: Modul edukasi berbasis artikel dengan tata letak Bento Grid dan sistem komentar dua arah untuk membangun kesadaran pengelolaan sampah.
* **Dashboard Warga**: Panel pribadi untuk memantau riwayat laporan, status penanganan, dan dokumentasi before-after penanganan sampah.

## Pendekatan Arsitektur

* **Paradigma Peta sebagai Pusat Interaksi**: Berbeda dari platform pelaporan berbasis formulir, Torang Bersih menempatkan peta sebagai bahasa universal yang dapat dipahami tanpa pelatihan teknis.
* **Prinsip View-First, Action-Later**: Akses informasi penuh tanpa kewajiban registrasi di awal untuk meminimalisir hambatan partisipasi masyarakat.
* **State Machine untuk Manajemen Laporan**: Transisi status laporan diatur oleh aturan bisnis backend yang ketat untuk memastikan integritas data dan akuntabilitas penanganan.

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-black)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900)

### Backend
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-REST%20API-black)
![Flask-RESTful](https://img.shields.io/badge/Flask--RESTful-API%20Framework-green)
![Flask-SQLAlchemy](https://img.shields.io/badge/Flask--SQLAlchemy-ORM-blue)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Relational%20DB-336791)
![PostGIS](https://img.shields.io/badge/PostGIS-Spatial%20Data-007396)

### External Services & Tools
![Google Maps API](https://img.shields.io/badge/Google%20Maps-API-4285F4)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Management-3448C5)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032)
![GitHub](https://img.shields.io/badge/GitHub-Repository-181717)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37)
![VSCode](https://img.shields.io/badge/VSCode-Editor-007ACC)
![Figma](https://img.shields.io/badge/Figma-UI%2FUX-F24E1E)

## Instalasi

### Prasyarat
* Node.js (v18 atau lebih baru)
* Python (v3.10 atau lebih baru)
* PostgreSQL (v14 atau lebih baru) dengan ekstensi PostGIS
* npm atau yarn package manager
* Git

---

### 1. Clone Repository

```bash
git clone https://github.com/LasalleVibers/torang-bersih.git
cd torang-bersih
```

---

### 2. Setup Backend (Flask + PostgreSQL)

```bash
# Masuk ke folder backend
cd be

# Membuat virtual environment
python -m venv venv

# Aktivasi virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Konfigurasi environment variables
cp .env.example .env
# Edit file .env dengan konfigurasi berikut:
# DATABASE_URL=postgresql://user:password@localhost:5432/torang_bersih
# GOOGLE_MAPS_API_KEY=your_api_key
# CLOUDINARY_URL=your_cloudinary_url
# SECRET_KEY=your_secret_key

# Inisialisasi database
flask db upgrade

# Jalankan server backend
flask run
```

Backend akan berjalan di `http://localhost:5000`

---

### 3. Setup Database (PostgreSQL + PostGIS)

1. Pastikan PostgreSQL telah terinstal dengan ekstensi PostGIS aktif.
2. Buat database baru:

```sql
CREATE DATABASE torang_bersih;
CREATE EXTENSION IF NOT EXISTS postgis;
```

3. Import skema awal jika tersedia:

```bash
# Dari folder backend
psql -U username -d torang_bersih -f assets/schema.sql
```

4. Jalankan migrasi Flask untuk membuat tabel:

```bash
flask db migrate -m "Initial migration"
flask db upgrade
```

---

### 4. Setup Frontend (React + Vite)

```bash
# Kembali ke root project, lalu masuk ke folder frontend
cd ../fe

# Install dependencies
npm install

# Konfigurasi environment variables
cp .env.example .env
# Edit file .env:
# VITE_API_BASE_URL=http://localhost:5000/api
# VITE_GOOGLE_MAPS_KEY=your_api_key

# Jalankan aplikasi dalam mode development
npm run dev

# Build untuk produksi
npm run build
```

Frontend akan berjalan di `http://localhost:5173`

---

### 5. Verifikasi Instalasi

Setelah backend dan frontend berjalan, akses aplikasi melalui browser:

```
http://localhost:5173
```

Pastikan:
* Peta interaktif termuat dengan benar
* Koneksi ke API backend berfungsi (cek Network tab di DevTools)
* Fitur upload foto terhubung ke Cloudinary

### Akun Demo (Opsional)

Untuk keperluan pengujian, gunakan kredensial berikut:

```
Role: Warga
Email: demo@warga.torangbersih.id
Password: Demo123!

Role: Kolaborator
Email: demo@kolaborator.torangbersih.id
Password: Demo123!
```

### Dokumentasi API

Dokumentasi lengkap endpoint API tersedia di:
```
/be/docs/api_documentation.md
```

Atau akses Swagger UI saat server berjalan:
```
http://localhost:5000/api/docs
```

## System Flow

| Alur Warga | Alur Kolaborator |
|------------|-----------------|
| <p align="center"><img src="assets/flow-warga.png" width="200"/></p> | <p align="center"><img src="assets/flow-kolaborator.png" width="200"/></p> |
| <p align="center"><sub>Landing -> Browse Map -> Buat Laporan -> Pantau Status -> Lapak Daur Ulang</sub></p> | <p align="center"><sub>Login -> Verifikasi Profil -> Kelola Aset -> Verifikasi Laporan -> Kelola Lapak</sub></p> |

## Screenshots

### Halaman Publik
| Beranda | Super Map | Detail Laporan |
|--------|-----------|----------------|
| <img src="assets/home-public.png" width="280"/> | <img src="assets/super-map.png" width="280"/> | <img src="assets/report-detail.png" width="280"/> |
| <p align="center"><sub>Halaman beranda dengan akses cepat ke fitur utama</sub></p> | <p align="center"><sub>Dashboard spasial dengan 4 layer interaktif</sub></p> | <p align="center"><sub>Detail laporan dengan timeline status dan dokumentasi</sub></p> |

---

### Fitur Pelaporan
| Step 1: Upload Foto | Step 2: Pilih Lokasi | Step 3: Detail Laporan |
|---------------------|---------------------|------------------------|
| <img src="assets/report-step1.png" width="280"/> | <img src="assets/report-step2.png" width="280"/> | <img src="assets/report-step3.png" width="280"/> |
| <p align="center"><sub>Upload bukti visual dengan preview real-time</sub></p> | <p align="center"><sub>Pemilihan lokasi via GPS, klik peta, atau pencarian alamat</sub></p> | <p align="center"><sub>Input detail sampah dengan validasi inline</sub></p> |

---

### Dashboard & Marketplace
| Dashboard Warga | Lapak Daur Ulang | Form Tambah Barang |
|----------------|------------------|-------------------|
| <img src="assets/user-dashboard.png" width="280"/> | <img src="assets/marketplace.png" width="280"/> | <img src="assets/add-item-form.png" width="280"/> |
| <p align="center"><sub>Monitoring laporan pribadi dengan status real-time</sub></p> | <p align="center"><sub>Marketplace barang bekas dengan filter kategori dan lokasi</sub></p> | <p align="center"><sub>Form pendaftaran barang dengan integrasi lokasi spasial</sub></p> |

---

### Pusat Literasi
| Artikel Grid | Detail Artikel |
|--------------|----------------|
| <img src="assets/articles-grid.png" width="280"/> | <img src="assets/article-detail.png" width="280"/> |
| <p align="center"><sub>Tata letak Bento Grid untuk navigasi konten edukasi</sub></p> | <p align="center"><sub>Halaman artikel dengan sistem komentar dua arah</sub></p> |

## Struktur Proyek

```
torang-bersih/
├── be/                         # Backend (Flask)
│   ├── app/
│   │   ├── __init__.py        # Application factory
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── user.py
│   │   │   ├── report.py
│   │   │   ├── collaborator.py
│   │   │   ├── asset.py
│   │   │   └── marketplace.py
│   │   ├── routes/            # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── reports.py
│   │   │   ├── collaborators.py
│   │   │   ├── marketplace.py
│   │   │   └── map.py
│   │   ├── services/          # Business logic
│   │   │   ├── email_service.py
│   │   │   ├── geocoding_service.py
│   │   │   └── storage_service.py
│   │   └── utils/             # Helpers & validators
│   ├── migrations/            # Flask-Migrate files
│   ├── tests/                 # Unit & integration tests
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment template
│   └── run.py                 # Entry point
│
├── fe/                         # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── common/        # Button, Modal, Input
│   │   │   ├── map/           # SuperMap, Marker, LayerControl
│   │   │   ├── reports/       # ReportForm, StatusTimeline
│   │   │   ├── marketplace/   # ItemCard, MarketplaceFilter
│   │   │   └── layout/        # Navbar, Footer, Sidebar
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── ReportPage.jsx
│   │   │   ├── MarketplacePage.jsx
│   │   │   ├── ArticlesPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Auth.jsx
│   │   ├── services/          # API client services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── reportService.js
│   │   │   └── marketplaceService.js
│   │   ├── utils/             # Constants & helpers
│   │   ├── context/           # React Context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── styles/            # Global & component styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── docs/                       # Documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # System design diagrams
│   └── user-guides/           # End-user manuals
│
├── assets/                     # Static assets for README
├── .gitignore
└── README.md
```

## Kontribusi

Proyek ini dikembangkan oleh **Tim Lasalle Vibers** untuk PROXOCORIS International Competition 2026.

### Tim Pengembang

| Nama | Peran | GitHub |
|------|-------|--------|
| Daniel Riky Warouw | Full Stack Developer | [@username](https://github.com/username) |
| Algy Fitzgerald Christian Ngenget | Frontend Developer | [@username](https://github.com/username) |
| Marcois Soleman Benedictus Makalew | Backend Developer | [@username](https://github.com/mrco23) |

### Panduan Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambahkan fitur X'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buka Pull Request

### Standar Kode

* Backend: Ikuti PEP 8 untuk Python, gunakan docstring untuk fungsi publik
* Frontend: Gunakan ESLint + Prettier dengan konfigurasi yang disediakan
* Commit: Gunakan Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk informasi lebih lanjut.

## Referensi

1. Legi, A. F., et al. (2023). Strategi Dinas Lingkungan Hidup Kota Manado dalam Pengelolaan Sampah di Kota Manado Provinsi Sulawesi Utara. Manado: Universitas Sam Ratulangi.
2. Kereh, B. K., Effendy, K., Suprajogo, T., & Ernawati, D. P. (2024). Transformasi Pengelolaan Sampah di Kota Manado Provinsi Sulawesi Utara. Jurnal Ilmiah Platax, 12(1), 45-58.
3. Pemerintah Republik Indonesia. (2008). Undang-Undang Nomor 18 Tahun 2008 tentang Pengelolaan Sampah.
4. United Nations. (2015). Sustainable Development Goal 11: Sustainable Cities and Communities.

## Kontak

Untuk pertanyaan atau kolaborasi terkait proyek ini:

* **Email**: torang.bersih@lasalle.ac.id
* **GitHub Issues**: [Buat issue baru](https://github.com/LasalleVibers/torang-bersih/issues)
* **Kompetisi**: @proxocoris (Instagram)

---

**Dibangun dengan komitmen untuk Manado yang lebih bersih dan berkeadilan**
```
