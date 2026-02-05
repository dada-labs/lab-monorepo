import React from "react";
import clsx from "clsx";

export interface FormTextAreaProps {
  label?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number; // textarea 특화 속성
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  helper?: string;
  className?: string;
}

export function FormTextArea({
  label,
  value,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  onChange,
  error,
  helper,
  className,
}: FormTextAreaProps) {
  return (
    <div className={clsx("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          "block w-full border rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none resize-none", // resize-none으로 크기 조절 고정 (필요시 제거)
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-primary",
          disabled && "bg-gray-100 cursor-not-allowed text-gray-500"
        )}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {!error && helper && (
        <p className="text-xs text-gray-400 mt-0.5">{helper}</p>
      )}
    </div>
  );
}
