import React from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  isActive,
}) => {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium px-4 py-2 transition-all duration-400 leading-none h-full flex items-center
        ${isActive
          ? "text-white bg-linear-to-b from-white/10 to-rose-600/1 "
          : "text-white/65 hover:text-white after:w-0 hover:after:w-full"
        }`}
    >
      {isActive ? <span className="top-0 left-1/2 absolute bg-white rounded-b-full w-8 h-1 -translate-x-1/2"></span> : ""}
      {children}
    </Link>
  );
};
