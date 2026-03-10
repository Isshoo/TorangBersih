import React from "react";
import Svg from "./Svg";
import FloatingIcons from "./FloatingIcons";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="relative z-0 flex h-115 w-full items-center bg-(--gray-shine) px-4 pt-24 md:px-6">
      <div className="z-10 mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="w-full space-y-5">
          <h1 className="text-4xl font-semibold">
            Temukan Kolaborator untuk Aksi Lingkunganmu
          </h1>
          <p>
            Jaringan kolektif pemangku kebijakan dan komunitas yang bergerak
            serentak untuk menuntaskan isu persampahan secara berkelanjutan
          </p>
          <Link
            to="/kolaborator/daftar"
            className="flex w-50 items-center rounded bg-(--primary) px-4 py-2 font-bold text-white hover:bg-(--primary-dark)"
          >
            Tambah Kolaborator
          </Link>
        </div>
        <div className="w-full">
          <div className="top-0 right-0 z-0">
            <FloatingIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
