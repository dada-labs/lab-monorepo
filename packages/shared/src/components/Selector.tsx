"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";

interface Option<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectorProps<T extends string> {
  value: T;
  size?: "sm" | "md" | "lg";
  options: Option<T>[];
  dropdownOptions?: Option<T>[];
  onChange: (newValue: T) => void;
  disabled?: boolean;
}

export function Selector<T extends string>({
  value,
  size = "lg",
  options,
  dropdownOptions,
  onChange,
  disabled,
}: SelectorProps<T>) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  const optionList = dropdownOptions ?? options;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <Button
        type="button"
        variant="line"
        size={size}
        onClick={() => setOpen((v) => !v)}
        className={clsx("!justify-between", open && "!border-gray-600")}
        disabled={disabled}
      >
        <span className="flex items-center gap-2">{current?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow">
          {optionList.map((option) => (
            <li key={option.value}>
              <Button
                type="button"
                variant="none"
                size={size}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="!justify-start hover:bg-gray-100"
              >
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
