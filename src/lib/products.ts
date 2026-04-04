import type { ProductCategory, ProductBase } from "@/types/product";
import { categoryLabels } from "@/types/product";

import dronesData from "@/data/products/drones.json";
import motorsData from "@/data/products/motors.json";
import escsData from "@/data/products/escs.json";
import camerasData from "@/data/products/cameras.json";
import vtxData from "@/data/products/vtx.json";

const dataMap: Record<ProductCategory, ProductBase[]> = {
  drone: dronesData as ProductBase[],
  motor: motorsData as ProductBase[],
  esc: escsData as ProductBase[],
  kamera: camerasData as ProductBase[],
  vtx: vtxData as ProductBase[],
};

export function getProductsByCategory(category: ProductCategory): ProductBase[] {
  return dataMap[category] || [];
}

export function getCategoryList() {
  return (Object.keys(categoryLabels) as ProductCategory[]).map((slug) => ({
    slug,
    label: categoryLabels[slug],
    count: (dataMap[slug] || []).length,
  }));
}

export function getBrands(category: ProductCategory): string[] {
  const products = getProductsByCategory(category);
  return [...new Set(products.map((p) => p.brand))].sort();
}
