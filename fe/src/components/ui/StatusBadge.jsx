// components/features/admin/artikel/ui/StatusBadge.jsx
import React from "react";
import {
  RiCheckboxCircleLine,
  RiTimeLine,
  RiArchiveLine,
} from "react-icons/ri";

const StatusBadge = ({ status }) => {
  const styles = {
    published: {
      bg: "var(--gray-shine)",
      text: "var(--primary)",
      border: "var(--primary)",
      icon: RiCheckboxCircleLine,  
      label: "Terbit",
    },
    draft: {
      bg: "#fff7ed",
      text: "#c2410c",
      border: "#fdba74",
      icon: RiTimeLine,
      label: "Draf/Pending",
    },
    archived: {
      bg: "var(--gray-shine)",
      text: "var(--gray)",
      border: "var(--gray-light)",
      icon: RiArchiveLine,
      label: "Arsip",
    },
  };

  const config = styles[status] || styles.draft;
  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border,
      }}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
