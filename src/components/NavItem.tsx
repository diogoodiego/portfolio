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
      className={`text-sm font-medium rounded-full px-4 py-2 transition-all duration-400 
        ${
          isActive
            ? "text-white bg-white/10"
            : "text-white/65 hover:text-white after:w-0 hover:after:w-full"
        }`}
    >
      {children}
    </Link>
  );
};
