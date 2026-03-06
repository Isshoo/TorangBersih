import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Perbaikan Icon Leaflet (Default sering tidak muncul di React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PetaPage = () => {
  // Koordinat Pusat: Manado, Sulawesi Utara
  const position = [1.4748, 124.8421];

  // Dummy Data Titik Sampah di Sulut
  const [locations] = useState([
    {
      id: 1,
      name: "Bank Sampah Wanea",
      lat: 1.4589,
      lng: 124.8385,
      type: "Kolabolator",
      status: "Buka",
    },
    {
      id: 2,
      name: "Titik Jemput Tuminting",
      lat: 1.502,
      lng: 124.845,
      type: "Aset",
      status: "Jadwal: Besok",
    },
    {
      id: 3,
      name: "Pusat Daur Ulang Bitung",
      lat: 1.445,
      lng: 125.121,
      type: "Laporan Sampah",
      status: "Buka",
    },
    {
      id: 4,
      name: "Pusat Daur Ulang Bitung",
      lat: 1.445,
      lng: 125.121,
      type: "Barang Daur Ulang",
      status: "Buka",
    },
  ]);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-50 pt-20">
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR PANEL (Kontrol & Filter) */}
        <aside className="flex hidden w-80 flex-col border-r border-gray-100 bg-white shadow-xl md:flex">
          <div className="p-6">
            <h1 className="mb-2 text-xl font-bold text-gray-900">
              Peta Torang Bersih
            </h1>
            <p className="mb-6 text-xs text-gray-500">
              Cari titik pengelolaan sampah terdekat di Sulawesi Utara.
            </p>

            {/* Filter Legend */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wider text-gray-700 uppercase">
                Kategori
              </h2>
              {[
                "Kolabolator",
                "Aset",
                "Laporan Sampah",
                "Barang Daur Ulang",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* List Card Terdekat */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/50 p-4">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-blue-300"
              >
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
                  {loc.type}
                </span>
                <h4 className="mt-1 font-bold text-gray-900">{loc.name}</h4>
                <p className="mt-1 text-xs text-gray-500">{loc.status}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* MAP CONTAINER */}
        <div className="relative flex-1">
          <MapContainer
            center={position}
            zoom={13}
            zoomControl={false} // Dimatikan agar kita bisa kustomisasi posisinya
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ZoomControl position="bottomright" />

            {/* Render Markers */}
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-blue-600">{loc.name}</h3>
                    <p className="text-xs text-gray-600">{loc.type}</p>
                    <button className="mt-2 w-full rounded bg-blue-600 py-1 text-[10px] text-white hover:bg-blue-700">
                      Petunjuk Arah
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full border-t border-gray-100 bg-white">
        <div className="flex w-full items-center justify-center p-4">
          <p className="text-xs text-gray-400">
            &copy; 2026 Torang Bersih - Sulawesi Utara Digital Ecosystem.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PetaPage;
