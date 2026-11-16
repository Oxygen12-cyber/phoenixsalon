"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  ScissorsIcon,
} from "@phosphor-icons/react";
import { Modal, SearchField } from "@heroui/react";
import { searchProducts } from "@/app/(site)/search-actions";
import { waLink } from "@/lib/whatsapp";
import type { ProductDTO } from "@/lib/products";

const DEBOUNCE_MS = 250;

const suggestions = ["Braids", "Extensions", "Install", "Curls"];

const categoryLabel = (category: string) =>
  category === "extension" ? "Extension" : "Hairstyle";

const formatPrice = (pence: number) =>
  `£${(pence / 100).toFixed(pence % 100 === 0 ? 0 : 2)}`;

interface ProductSearchProps {
  open: boolean;
  onClose: () => void;
}

const ProductSearch = ({ open, onClose }: ProductSearchProps) => {
  const requestId = useRef(0);

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{
    term: string;
    results: ProductDTO[];
    error: boolean;
  } | null>(null);

  const term = query.trim();
  const idle = term.length < 2;
  const settled = response?.term === term;
  const loading = !idle && !settled;
  const results = settled ? response.results : [];
  const error = settled && response.error;
  const searched = settled;

  useEffect(() => {
    if (!open || term.length < 2) return;

    const id = ++requestId.current;

    const timer = setTimeout(async () => {
      try {
        const data = await searchProducts(term);
        if (id !== requestId.current) return;
        setResponse({ term, results: data, error: false });
      } catch {
        if (id !== requestId.current) return;
        setResponse({ term, results: [], error: true });
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [term, open]);

  const handleClose = () => {
    requestId.current += 1;
    setQuery("");
    onClose();
  };

  return (
    <Modal.Backdrop
      isOpen={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) handleClose();
      }}
    >
      <Modal.Container placement="center">
        <Modal.Dialog
          aria-label="Search styles"
          className="max-h-[85vh] sm:max-w-2xl"
        >
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="bg-[#F7EBE7] text-black">
              <MagnifyingGlassIcon size={20} weight="bold" aria-hidden />
            </Modal.Icon>
            <Modal.Heading className="text-lg font-bold text-black">
              Search styles
            </Modal.Heading>
          </Modal.Header>

          <Modal.Body className="overflow-visible">
            <SearchField
              aria-label="Search products"
              className="w-full"
              value={query}
              onChange={setQuery}
              autoFocus
            >
              <SearchField.Group className="w-full">
                <SearchField.SearchIcon />
                <SearchField.Input
                  className="w-full"
                  placeholder="Try “braids”, “extensions” or “install”"
                  autoComplete="off"
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>

            <p className="sr-only" aria-live="polite">
              {loading
                ? "Searching"
                : searched && !error
                  ? `${results.length} result${results.length === 1 ? "" : "s"}`
                  : ""}
            </p>

            <div className="mt-4 max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain">
              {loading ? (
                <div className="space-y-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3">
                      <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-[#F7EBE7]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#F7EBE7]" />
                        <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#F7EBE7]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : idle ? (
                <div className="px-1 py-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#80726D]">
                    Popular searches
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setQuery(suggestion)}
                        className="min-h-11 rounded-full border border-black/10 bg-white px-4 text-sm font-medium text-[#423F3F] transition hover:border-black/20 hover:bg-[#F7EBE7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <p className="px-2 py-8 text-center text-sm text-[#6B6560]">
                  Search is unavailable right now. Please try again.
                </p>
              ) : results.length === 0 ? (
                <div className="px-2 py-8 text-center">
                  <p className="text-sm text-[#423F3F]">
                    No matches for “{term}”.
                  </p>
                  <p className="mt-1 text-sm font-light text-[#6B6560]">
                    Try “braids”, “extensions” or “install”, or message us for
                    help.
                  </p>
                </div>
              ) : (
                <ul role="list" className="divide-y divide-black/5">
                  {results.map((item) => (
                    <li key={item.id}>
                      <a
                        href={waLink(
                          `Hi Phoenix Salon, I'd like to book "${item.name}".`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="flex min-h-20 items-center gap-3 rounded-2xl p-3 transition hover:bg-[#F7EBE7]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt=""
                            width={56}
                            height={56}
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                          />
                        ) : (
                          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F7EBE7] text-[#80726D]">
                            <ScissorsIcon size={22} aria-hidden />
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-black sm:text-base">
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-[#6B6560] sm:text-sm">
                            {categoryLabel(item.category)}
                            {item.price != null
                              ? ` · From ${formatPrice(item.price)}`
                              : ""}
                          </span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#423F3F]">
                          Book
                          <ArrowRightIcon
                            size={14}
                            weight="bold"
                            aria-hidden
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};

export default ProductSearch;
