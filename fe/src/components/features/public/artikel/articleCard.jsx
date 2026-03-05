import React from "react";
import { Link } from "react-router-dom"; // <-- Tambahkan import ini
import {  FaComment } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";

const ArticleCard = ({ article }) => {
  return (
    <article className="py-8 border-b border-gray-100 flex flex-col-reverse sm:flex-row gap-6 group">
      
      {/* Bagian Teks */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-3">
          <img src={article.authorImage} alt={article.author} className="w-6 h-6 rounded-full" />
          <span className="text-sm font-medium text-gray-700">{article.author}</span>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-2 hidden sm:inline-block">
            {article.category}
          </span>
        </div>

        {/* --- JUDUL YANG BISA DIKLIK --- */}
        <Link to={`/artikel/${article.id}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
        </Link>
        
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Meta: Date, Like & Comment */}
        <div className="flex items-center text-sm text-gray-500 gap-6 mt-auto">
          <span>{article.date}</span>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
               <AiTwotoneLike /> <span>{article.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
               <FaComment /> <span>{article.comments}</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- GAMBAR YANG BISA DIKLIK --- */}
      <Link to={`/artikel/${article.id}`} className="w-full sm:w-32 md:w-48 shrink-0 overflow-hidden rounded-md bg-gray-100 flex items-center block">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-40 sm:h-32 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

    </article>
  );
};

export default ArticleCard;