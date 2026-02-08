"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "disabled"
  | "danger"
  | "line"
  | "linePrimary"
  | "none";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const baseStyle =
  "group relative inline-flex w-full gap-2 items-center justify-center rounded-md font-medium focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400";

const variantStyle: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-gray-900 hover:bg-gray-200",
  dark: "bg-black text-white hover:bg-gray-900",
  disabled: "!bg-gray-200 !text-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700",
  line: "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50",
  linePrimary:
    "bg-white border border-primary text-primary hover:bg-primary-lightest",
  none: "px-0 bg-transparent text-gray-600",
};

const sizeStyle: Record<ButtonSize, string> = {
  sm: "px-3 h-6 text-sm",
  md: "px-4 h-10 text-sm",
  lg: "px-5 h-12 text-base",
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  size = "lg",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx(
        baseStyle,
        sizeStyle[size],
        variantStyle[variant],
        isDisabled
          ? "cursor-not-allowed !bg-gray-200 !text-gray-500 "
          : "cursor-pointer",
        className
      )}
      {...props}
    >
      {isLoading ? "처리 중..." : children}
    </button>
  );
}
