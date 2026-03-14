# Torang Bersih

Satu platform untuk menghubungkan warga, komunitas, dan pemerintah dalam menjaga lingkungan Sulawesi Utara dari ancaman sampah. Laporkan. Pantau. Bergerak Bersama.

---

## Daftar Isi

- [Tentang](#tentang)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Struktur Proyek](#struktur-proyek)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Dokumentasi API](#dokumentasi-api)
- [Skrip](#skrip)
- [Lisensi](#lisensi)

---

## Tentang

Torang Bersih adalah inisiatif digital yang bertujuan menciptakan Sulawesi Utara yang lebih bersih melalui kolaborasi masyarakat, komunitas, dan pemerintah daerah. Platform ini menyatukan pelaporan sampah ilegal, pemetaan aset kebersihan, registrasi kolaborator, marketplace barang daur ulang, dan konten edukasi dalam satu ekosistem berbasis peta.

**Cakupan:** Sulawesi Utara, Indonesia (kota hingga kabupaten).

---

## Fitur Utama

- **Laporan Sampah Ilegal** — Warga melaporkan titik pembuangan sampah liar dengan foto bukti, lokasi di peta, dan detail (jenis sampah, karakteristik, bentuk timbulan). Laporan memiliki siklus status dan tindak lanjut penanganan dengan dokumentasi foto sebelum-sesudah.
- **Kolaborator** — Komunitas, LSM, sekolah, instansi pemerintah, dan CSR mendaftar sebagai kolaborator. Profil terverifikasi tampil di daftar dan peta untuk memudahkan jejaring dan aksi bersama.
- **Aset Sampah** — Pencarian dan pemetaan fasilitas seperti bank sampah, TPS, TPST, composting, dan kendaraan pengangkut beserta kontak dan lokasi.
- **Barang Daur Ulang** — Marketplace barang bekas (plastik, kaca, logam, kertas, elektronik) dengan status ketersediaan dan lokasi penjual untuk mendorong ekonomi sirkular.
- **Peta Interaktif** — Satu peta dengan lapisan Kolaborator, Aset, Laporan Sampah, dan Barang Daur Ulang. Filter per kategori dan pencarian lokasi.
- **Artikel dan Edukasi** — Konten artikel (edukasi, berita, event, opini) dengan editor teks kaya untuk kampanye dan informasi lingkungan.
- **Dashboard** — Ringkasan statistik dan aktivitas untuk pengguna dan pengelola.

---

## Screenshots

Tambahkan screenshot di bawah ini ke folder `docs/images/` (atau sesuaikan path). Ganti `docs/images/` dengan path yang Anda gunakan.

| Deskripsi | Path yang disarankan |
|-----------|----------------------|
| Landing page: hero section "Laporkan. Pantau. Bergerak Bersama." dengan empat kartu fitur (Kolaborator, Aset, Laporan Sampah, Barang Daur Ulang) dan CTA Daftar Kolaborator | `docs/images/landing-hero.png` |
| Blok "Hadir untuk Sulawesi Utara" dengan empat poin tujuan (laporkan sampah ilegal, temukan titik pilahan, bagikan barang bekas, daftar kolaborator) | `docs/images/landing-tujuan.png` |
| Peta interaktif penuh: sidebar filter (Kolaborator, Aset, Laporan Sampah, Barang Daur Ulang) dan peta dengan marker berbagai tipe di Sulawesi Utara | `docs/images/peta-interaktif.png` |
| Halaman daftar laporan sampah: tab status (Semua, Diterima, Ditindak, Selesai), search, filter jenis sampah, dan kartu laporan | `docs/images/laporan-daftar.png` |
| Wizard buat laporan: salah satu langkah (foto bukti, lokasi di peta, atau detail laporan) | `docs/images/laporan-buat.png` |
| Halaman detail laporan: info lokasi, jenis sampah, foto bukti, status, dan deskripsi | `docs/images/laporan-detail.png` |
| Daftar kolaborator: kartu profil kolaborator dengan nama, jenis, lokasi, dan status | `docs/images/kolaborator-daftar.png` |
| Daftar aset: kartu aset (bank sampah, TPS, dll) dengan nama, kategori, alamat, dan gambar | `docs/images/aset-daftar.png` |
| Marketplace barang bekas: grid barang dengan foto, nama, kategori, kondisi, dan lokasi | `docs/images/barang-bekas-daftar.png` |
| Form multi-step jual barang bekas: langkah detail barang atau langkah lokasi dengan peta | `docs/images/barang-bekas-input.png` |
| Dashboard pengguna: greeting, kartu statistik, panel status, daftar laporan dan artikel saya | `docs/images/dashboard-user.png` |
| Dashboard admin: statistik agregat (user, laporan, artikel, marketplace), status group, tabel aktivitas terbaru | `docs/images/dashboard-admin.png` |
| Halaman artikel publik: daftar artikel dengan kartu dan filter kategori | `docs/images/artikel-daftar.png` |
| Halaman detail artikel: judul, kategori, penulis, tanggal, isi artikel (rich text), like dan komentar | `docs/images/artikel-detail.png` |

Contoh penggunaan di README (setelah gambar diisi):

```markdown
### Landing Page

![Landing hero](docs/images/landing-hero.png)

### Peta Interaktif

![Peta interaktif](docs/images/peta-interaktif.png)
```

---

## Teknologi

**Frontend**

- React 19, Vite (rolldown-vite)
- React Router v7, Tailwind CSS v4
- Axios, React Hot Toast
- Leaflet / react-leaflet (peta)
- Lucide React, React Icons
- Google OAuth (@react-oauth/google)

**Backend**

- Flask 3
- Flask-SQLAlchemy, Flask-Migrate
- Flask-JWT-Extended, Flask-Cors, Flask-Limiter
- Flask-Mail (verifikasi email, reset password)
- Marshmallow (validasi request)
- PostgreSQL (psycopg2-binary)
- Cloudinary (unggahan gambar)
- Gunicorn / Waitress (production)

---

## Struktur Proyek

```
Torang-Bersih/
├── fe/                    # Frontend (React SPA)
│   ├── src/
│   │   ├── components/    # Layouts, fitur publik/user/admin, shared, common
│   │   ├── contexts/      # Auth, theme, OAuth
│   │   ├── hooks/
│   │   ├── pages/         # Public, auth, user, admin
│   │   ├── services/      # API routes (axios)
│   │   └── utils/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── be/                    # Backend (Flask API)
│   ├── app/
│   │   ├── api/           # controllers, routes, services
│   │   ├── config/
│   │   ├── database/models/
│   │   ├── middlewares/
│   │   ├── schemas/
│   │   └── utils/
│   ├── docs/
│   ├── scripts/
│   ├── tests/
│   ├── migrations/
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

---

## Prasyarat

- Node.js (untuk frontend, disarankan LTS)
- Python 3.10+ (untuk backend)
- PostgreSQL
- Akun Cloudinary (unggahan gambar)
- (Opsional) Akun Google Cloud untuk OAuth dan SMTP untuk email

---

## Instalasi

### 1. Clone repositori

```bash
git clone https://github.com/<org>/Torang-Bersih.git
cd Torang-Bersih
```

### 2. Backend

```bash
cd be
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env dengan nilai yang sesuai (database, JWT, mail, Cloudinary)

flask db upgrade
```

### 3. Frontend

```bash
cd fe
npm install
cp .env.example .env
# Edit .env: VITE_API_URL dan (opsional) VITE_GOOGLE_CLIENT_ID
```

---

## Variabel Lingkungan

**Backend (`be/.env`)**

- `FLASK_ENV` — development / production
- `PORT`, `HOST` — server
- `SECRET_KEY`, `JWT_SECRET_KEY` — rahasia aplikasi dan JWT
- `DATABASE_URL` — connection string PostgreSQL
- `CORS_ORIGINS` — origin frontend yang diizinkan (mis. http://localhost:5173)
- `FRONTEND_URL` — URL frontend untuk link di email
- `MAIL_*` — SMTP (verifikasi email, reset password)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Frontend (`fe/.env`)**

- `VITE_API_URL` — base URL API backend (mis. http://127.0.0.1:5000/api)
- `VITE_GOOGLE_CLIENT_ID` — Client ID Google OAuth (opsional)

---

## Menjalankan Aplikasi

**Backend**

```bash
cd be
.venv\Scripts\activate   # atau source .venv/bin/activate
python server.py
```

Server API berjalan pada `http://localhost:5000` (atau sesuai `HOST` dan `PORT` di `.env`).

**Frontend**

```bash
cd fe
npm run dev
```

Aplikasi web berjalan pada `http://localhost:5173` (atau port yang ditampilkan Vite). Pastikan `VITE_API_URL` mengarah ke backend yang sedang berjalan.

**Production**

- Backend: `gunicorn server:app --bind 0.0.0.0:5000`
- Frontend: `npm run build` lalu deploy hasil `dist/` ke layanan static (Nginx, Vercel, dsb.)

---

## Dokumentasi API

Dokumentasi detail endpoint API tersedia di:

- `be/docs/API.md` (jika ada)
- Koleksi Bruno di `be/bruno/` untuk pengujian request

Health check: `GET /health` (atau root) pada base URL backend.

---

## Skrip

**Seed database (data contoh)**

```bash
cd be
python -m scripts.db.seed
```

**Buat akun admin baru**

```bash
cd be
python -m scripts.db.create_admin
```

**Jalankan tes backend**

```bash
cd be
pytest
# atau: pytest tests/auth/test_auth.py -v
```

**Lint frontend**

```bash
cd fe
npm run lint
npm run format
```

---

## Lisensi

Proyek ini dikembangkan oleh Lasalle Vibers. Hak cipta dilindungi. Untuk penggunaan dan lisensi lebih lanjut, hubungi pemilik repositori.

---

## Kontribusi

Untuk kontribusi (bug report, fitur, dokumentasi), silakan buka issue atau pull request di repositori ini. Pastikan backend dan frontend mengikuti struktur dan konvensi yang ada.
