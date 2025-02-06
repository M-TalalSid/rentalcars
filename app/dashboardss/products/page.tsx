"use client";

import { Suspense } from "react";
import { client, PRODUCT_QUERY } from "@/lib/sanity";
import { ProductsTable } from "./components/products-table";
import { ProductsTableSkeleton } from "./components/products-table-skeleton";
import { Button } from "@/components/ui/button";

async function getProducts() {
  return client.fetch(PRODUCT_QUERY);
}
export default async function ProductsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button>Add New Product</Button>
      </div>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTable getProductsAction={getProducts} />
      </Suspense>
    </div>
  );
}