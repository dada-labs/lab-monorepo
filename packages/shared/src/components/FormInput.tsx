import React from "react";
import clsx from "clsx";

export interface FormInputProps {
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "url"; // 타입 확장
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  helper?: string;
  className?: string; // 외부에서 스타일 조절을 위한 prop 추가
  name?: string; // 폼 제출 시 필요한 name 추가
}

export function FormInput({
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  onChange,
  onBlur,
  error,
  helper,
  className,
  name,
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
          "relative block w-full h-12 rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:z-10 focus:outline-none",
          // 에러 여부에 따른 보더 색상 처리
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500", // 'primary' 대신 범용적인 색상 사용
          disabled && "bg-gray-100 cursor-not-allowed text-gray-500"
        )}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {!error && helper && (
        <p className="text-xs text-gray-400 mt-0.5">{helper}</p>
      )}
    </div>
  );
}
