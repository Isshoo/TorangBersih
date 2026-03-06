import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  popularArticles,
  topics,
  isLoggedIn = false,
  openModal,
}) => {
  return (
    <aside className="hidden h-fit border-l border-gray-100 pl-8 lg:block">
      {/* container already sticky; inner div no longer needs positioning */}
      <div className="w-full">
        {/* SEKSI KOMENTAR */}
        <div className="mb-10">
          <h3 className="mb-4 text-base font-bold tracking-tight text-gray-900">
            Respon
          </h3>

          {isLoggedIn ? (
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <textarea
                className="min-h-[80px] w-full resize-none border-none text-sm placeholder-gray-400 focus:ring-0"
                placeholder="Tulis pendapat Anda..."
              />
              <div className="mt-2 flex justify-end border-t border-gray-50 pt-2">
                <button className="rounded-full bg-green-600 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-green-700">
                  Balas
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={openModal}
              className="group cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-all hover:border-gray-400 hover:bg-gray-100"
            >
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                Ingin ikut berdiskusi? Login untuk memberikan apresiasi atau
                komentar.
              </p>
              <button className="w-full rounded-full bg-gray-900 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-black">
                Login
              </button>
            </div>
          )}
        </div>

        {/* Pilihan Editor */}
        <div className="mb-10">
          <h3 className="mb-6 text-base font-bold text-gray-900">
            Pilihan Editor
          </h3>
          <div className="flex flex-col gap-6">
            {popularArticles &&
              popularArticles.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="mb-2 flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${item.author}&background=random&size=24`}
                      alt={item.author}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-gray-700 group-hover:text-black">
                      {item.author}
                    </span>
                  </div>
                  <h4 className="line-clamp-2 text-sm leading-snug font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[11px] font-medium tracking-wider text-gray-500 uppercase">
                    {item.date}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Topik Terkait */}
        <div className="mb-10">
          <h3 className="mb-4 text-base font-bold text-gray-900">
            Topik Terkait
          </h3>
          <div className="flex flex-wrap gap-2">
            {topics &&
              topics.map((topic, index) => (
                <button
                  key={index}
                  className="rounded-full border border-transparent bg-gray-100 px-4 py-2 text-xs text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-200"
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
