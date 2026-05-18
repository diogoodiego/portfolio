"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-white text-black shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] active:translate-y-0",
    secondary:
      "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-white/20 hover:-translate-y-0.5",
    ghost: "bg-transparent text-white hover:bg-white/5",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#3b82f6] hover:bg-[#3b82f6]/5",
  }[variant];

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-8 py-4 text-[1.1rem]",
  }[size];

  const baseClasses =
    "inline-flex items-center justify-center rounded-[10px] font-semibold cursor-pointer transition-all duration-300 gap-2 outline-none relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = `
    ${baseClasses}
    ${variantClasses}
    ${sizeClasses}
    ${fullWidth ? "w-full" : ""}
    ${isLoading ? "text-transparent!" : ""}
    ${className}
  `.trim();

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
