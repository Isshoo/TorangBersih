import React from "react";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-10 w-full z-50 flex items-center justify-center p-4k ">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Login Diperlukan</h3>
        <p className="text-gray-500 mb-6 text-sm">
          Silakan login atau daftar terlebih dahulu untuk memberikan apresiasi atau berdiskusi di komunitas Torang Bersih.
        </p>
        <div className="flex flex-col gap-3">
          <Link 
            to="/login"
            className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Masuk Sekarang
          </Link>
          <button 
            onClick={onClose}
            className="text-gray-500 text-sm font-medium hover:text-gray-900"
          >
            Mungkin Nanti
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;