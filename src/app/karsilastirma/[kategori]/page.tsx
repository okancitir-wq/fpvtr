"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  categoryLabels,
  categorySpecs,
  specLabels,
  type ProductCategory,
} from "@/types/product";
import { getProductsByCategory, getBrands } from "@/lib/products";

export default function KategoriPage() {
  const params = useParams();
  const kategori = params.kategori as ProductCategory;

  const allProducts = useMemo(
    () => getProductsByCategory(kategori),
    [kategori]
  );
  const brands = useMemo(() => getBrands(kategori), [kategori]);
  const specs = categorySpecs[kategori] || [];

  const [brandFilter, setBrandFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (brandFilter) {
      result = result.filter((p) => p.brand === brandFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    if (sortBy === "price") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [allProducts, brandFilter, search, sortBy]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 4) {
        next.add(id);
      }
      return next;
    });
  };

  const selectedProducts = allProducts.filter((p) => selectedIds.has(p.id));

  if (!categoryLabels[kategori]) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-zinc-100">
          Kategori bulunamadı
        </h1>
        <Link
          href="/karsilastirma"
          className="mt-4 inline-block text-fpv-cyan hover:underline"
        >
          &larr; Kategorilere dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/karsilastirma" className="hover:text-fpv-cyan transition-colors">
          Karşılaştırma
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{categoryLabels[kategori]}</span>
      </nav>

      <h1 className="text-4xl font-bold text-zinc-100">
        {categoryLabels[kategori]} Karşılaştırma
      </h1>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-fpv-cyan focus:outline-none"
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 focus:border-fpv-cyan focus:outline-none"
        >
          <option value="">Tüm Markalar</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-fpv-border bg-fpv-card px-3 py-2 text-sm text-zinc-100 focus:border-fpv-cyan focus:outline-none"
        >
          <option value="">Sırala</option>
          <option value="name">İsim</option>
          <option value="price">Fiyat</option>
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-fpv-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fpv-border bg-fpv-card">
              <th className="sticky left-0 bg-fpv-card px-4 py-3 text-left font-medium text-zinc-400">
                Seç
              </th>
              <th className="sticky left-12 bg-fpv-card px-4 py-3 text-left font-medium text-zinc-400">
                Ürün
              </th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">
                Marka
              </th>
              {specs.map((spec) => (
                <th
                  key={spec}
                  className="px-4 py-3 text-left font-medium text-zinc-400 whitespace-nowrap"
                >
                  {specLabels[spec] || spec}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium text-zinc-400">
                Fiyat
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const isSelected = selectedIds.has(product.id);
              return (
                <tr
                  key={product.id}
                  className={`border-b border-fpv-border transition-colors ${
                    isSelected
                      ? "bg-fpv-cyan/5"
                      : "hover:bg-fpv-card/50"
                  }`}
                >
                  <td className="sticky left-0 bg-inherit px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(product.id)}
                      className="accent-fpv-cyan"
                    />
                  </td>
                  <td className="sticky left-12 bg-inherit px-4 py-3 font-medium text-zinc-100 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{product.brand}</td>
                  {specs.map((spec) => (
                    <td key={spec} className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                      {(product as unknown as Record<string, unknown>)[spec]?.toString() ?? "-"}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-fpv-lime whitespace-nowrap">
                    {product.price
                      ? `${product.price.toLocaleString("tr-TR")} ₺`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-zinc-500">Ürün bulunamadı.</p>
      )}

      {/* Side-by-side comparison */}
      {selectedProducts.length >= 2 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-100">
            Karşılaştırma ({selectedProducts.length} ürün)
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-fpv-cyan/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-fpv-border bg-fpv-cyan/5">
                  <th className="px-4 py-3 text-left font-medium text-zinc-400">
                    Özellik
                  </th>
                  {selectedProducts.map((p) => (
                    <th
                      key={p.id}
                      className="px-4 py-3 text-left font-medium text-fpv-cyan"
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-fpv-border">
                  <td className="px-4 py-3 text-zinc-400">Marka</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="px-4 py-3 text-zinc-200">
                      {p.brand}
                    </td>
                  ))}
                </tr>
                {specs.map((spec) => (
                  <tr key={spec} className="border-b border-fpv-border">
                    <td className="px-4 py-3 text-zinc-400">
                      {specLabels[spec] || spec}
                    </td>
                    {selectedProducts.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-zinc-200">
                        {(p as unknown as Record<string, unknown>)[spec]?.toString() ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3 text-zinc-400">Fiyat</td>
                  {selectedProducts.map((p) => (
                    <td key={p.id} className="px-4 py-3 font-semibold text-fpv-lime">
                      {p.price
                        ? `${p.price.toLocaleString("tr-TR")} ₺`
                        : "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
