import api from "@/api/api";
import ProductList from "@/components/pages/Home/ProductList";
import { products } from "@/utils/data";
import React from "react";

const HomePage = async () => {
  const { data } = await api.get("/product/all");
  console.log("user", data);
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
