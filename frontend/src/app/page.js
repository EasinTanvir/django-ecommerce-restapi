import api from "@/api/api";
import CategoryList from "@/components/pages/Home/CategoryList";
import ProductList from "@/components/pages/Home/ProductList";
import { categories, products } from "@/utils/data";
import React from "react";

const HomePage = async () => {
  const { data } = await api.get("/product/all");

  return (
    <div>
      <CategoryList categories={categories} />
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
