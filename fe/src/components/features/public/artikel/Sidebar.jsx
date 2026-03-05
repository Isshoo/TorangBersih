import React from "react";
import { Link } from "react-router-dom"; 

const Sidebar = ({ popularArticles, topics, isLoggedIn = false, openModal }) => {
  return (
  
    <aside className="hidden lg:block border-l border-gray-100 pl-8 h-fit sticky top-44">
      {/* container already sticky; inner div no longer needs positioning */}
      <div className="w-full"> 
        
        {/* SEKSI KOMENTAR */}
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-900 mb-4 tracking-tight">Respon</h3>
          
          {isLoggedIn ? (
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
               <textarea 
                 className="w-full text-sm border-none focus:ring-0 resize-none placeholder-gray-400 min-h-[80px]"
                 placeholder="Tulis pendapat Anda..."
               />
               <div className="flex justify-end mt-2 pt-2 border-t border-gray-50">
                 <button className="bg-green-600 text-white text-xs px-5 py-2 rounded-full font-bold hover:bg-green-700 transition-all">
                   Balas
                 </button>
               </div>
            </div>
          ) : (
            <div 
              onClick={openModal}
              className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-300 text-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all group"
            >
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Ingin ikut berdiskusi? Login untuk memberikan apresiasi atau komentar.
              </p>
              <button 
                className="w-full bg-gray-900 text-white text-sm py-2.5 rounded-full font-bold group-hover:bg-black transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Pilihan Editor */}
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-900 mb-6">Pilihan Editor</h3>
          <div className="flex flex-col gap-6">
            {popularArticles && popularArticles.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${item.author}&background=random&size=24`} 
                    alt={item.author} 
                    className="w-5 h-5 rounded-full object-cover" 
                  />
                  <span className="text-xs font-bold text-gray-700 group-hover:text-black">{item.author}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-snug transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-medium">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topik Terkait */}
        <div className="mb-10">
          <h3 className="text-base font-bold text-gray-900 mb-4">Topik Terkait</h3>
          <div className="flex flex-wrap gap-2">
            {topics && topics.map((topic, index) => (
              <button 
                key={index} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-2 px-4 rounded-full transition-all border border-transparent hover:border-gray-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
    
      </div>
    </aside>
  );
};

export default Sidebar;