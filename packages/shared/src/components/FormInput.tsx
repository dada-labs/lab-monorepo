import React from "react";
import clsx from "clsx";

export interface FormInputProps {
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "url" | "date"; // 타입 확장
  size?: "lg" | "md" | "sm";
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  helper?: string;
  className?: string; // 외부에서 스타일 조절을 위한 prop 추가
  name?: string; // 폼 제출 시 필요한 name 추가
  isIcon?: boolean;
}

export function FormInput({
  label,
  type = "text",
  size = "lg",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
  onKeyDown,
  onBlur,
  error,
  helper,
  className,
  name,
  isIcon = false,
}: FormInputProps) {
  return (
    <div className={clsx("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        name={name}
        type={type}
        required={required}
        className={clsx(
          "relative block w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:outline-none",
          size === "lg" && "h-12",
          size === "md" && "h-10 text-sm",
          size === "sm" && "h-6 text-sm",
          // 에러 여부에 따른 보더 색상 처리
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary",
          disabled && "bg-gray-100 cursor-not-allowed text-gray-500",
          isIcon && size === "lg" && "pl-12",
          isIcon && size === "md" && "pl-10",
          isIcon && size === "sm" && "pl-6"
        )}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {!error && helper && (
        <p className="text-xs text-gray-400 mt-0.5">{helper}</p>
      )}
    </div>
  );
}
