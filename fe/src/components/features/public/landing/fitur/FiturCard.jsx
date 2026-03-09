import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const FiturCard = ({ title, description, icon, link }) => {
  return (
    <div className="flex w-full flex-row items-center gap-4 rounded-3xl bg-white px-4 py-5 shadow-[0px_0px_20px_5px_rgba(0,0,0,0.15)] md:min-h-[475px] md:max-w-[240px] md:flex-col md:justify-between md:gap-10 md:rounded-[80px] md:px-2 md:py-12 md:shadow-[0px_0px_30px_5px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3 md:flex-col">
        {/* icon */}
        <div className="md:pt-5">
          <img src={icon} alt="handshake" className="h-12 md:h-25" />
        </div>
        {/* title */}
        <h3 className="text-base font-semibold tracking-tighter md:mt-5 md:text-xl">
          {title}
        </h3>
      </div>
      {/* description */}
      <div className="hidden md:block">
        <p className="text-md leading-5 font-semibold tracking-tighter text-gray-500">
          {description}
        </p>
      </div>
      {/* button link */}
      <div className="ml-auto flex items-center md:ml-0 md:flex-1 md:items-end">
        <Link to={link}>
          {/* animation on hover */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary) font-bold text-white transition-all duration-300 hover:scale-110 hover:bg-(--primary-dark)">
            <LuArrowRight className="text-xl transition-all duration-300 hover:scale-110" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FiturCard;
