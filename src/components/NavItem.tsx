import React from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  isActive,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative rounded-full text-sm font-medium px-5 py-3 transition-all duration-400 leading-none h-full flex items-center
        ${isActive
          ? "text-white bg-white/10 "
          : "text-white/65 hover:text-white after:w-0 hover:after:w-full"
        }`}
    >
      {isActive ? <span className="top-0 left-1/2 absolute bg-white rounded-b-full w-8 h-[3px] -translate-x-1/2"></span> : ""}
      {children}
    </Link>
  );
};
