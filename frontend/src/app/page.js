import api from "@/api/api";
import CategoryList from "@/components/pages/Home/CategoryList";
import ProductList from "@/components/pages/Home/ProductList";
import { categories, products } from "@/utils/data";
import getServerCredentials from "@/utils/session";
import React from "react";

const HomePage = async () => {
  const session = await getServerCredentials();

  console.log("session", session);

  return (
    <div>
      <CategoryList categories={categories} />
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
