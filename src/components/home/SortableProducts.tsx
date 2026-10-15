
"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import ProductCard from "@/components/shared/ProductCard";
import { IProduct, SortKey } from "@/types/product.type";

const options: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
  { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
];

const SortableProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // sorts on the raw number, never the bengali string the card renders
  const sorted = useMemo(() => {
    if (sortBy === "default") return products;

    const copy = [...products];
    copy.sort((a, b) =>
      sortBy === "low-to-high" ? a.today - b.today : b.today - a.today,
    );

    return copy;
  }, [products, sortBy]);

  const currentLabel = options.find((opt) => opt.value === sortBy)?.label || "ডিফল্ট";

  return (
    <>
      <div className="mt-6 flex items-center justify-end gap-2">
        <span className="text-sm font-medium text-ink/80">সাজান</span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink outline-none transition hover:border-bazar"
          >
            <span>{currentLabel}</span>
            <FiChevronDown
              className={`text-bazar transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-line bg-paper p-1 shadow-lg z-20">
              {options.map((option) => {
                const isSelected = sortBy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                      isSelected ? "bg-bazar/10 text-bazar font-medium" : "text-ink hover:bg-black/5"
                    }`}
                  >
                    <span className="w-4 flex items-center justify-center">
                      {isSelected && <FiCheck className="text-bazar text-xs" />}
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SortableProducts;