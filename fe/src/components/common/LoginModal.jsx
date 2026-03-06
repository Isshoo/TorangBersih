import React from "react";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-10 z-50 flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm transform rounded-2xl bg-white p-8 text-center shadow-2xl transition-all">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          Login Diperlukan
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          Silakan login atau daftar terlebih dahulu untuk memberikan apresiasi
          atau berdiskusi di komunitas Torang Bersih.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="rounded-xl bg-blue-600 py-3 font-bold text-white transition-colors hover:bg-blue-700"
          >
            Masuk Sekarang
          </Link>
          <button
            onClick={onClose}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            Mungkin Nanti
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
