// components/features/admin/artikel/ui/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon: Icon, colorVar, trend, subtitle }) => {
  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm 
                 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `color-mix(in srgb, var(${colorVar}) 10%, transparent)`,
            color: `var(${colorVar})`,
          }}
        >
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold mb-1" style={{ color: "var(--dark-text)" }}>
          {value}
        </p>
        <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;