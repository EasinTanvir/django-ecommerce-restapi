import React from "react";

import ProductList from "@/components/pages/Home/ProductList";
import { products } from "@/utils/data";

const ProductDetails = async ({ params }) => {
  const { pId } = await params;
  return (
    <div>
      {" "}
      <ProductList products={products} />
    </div>
  );
};

export default ProductDetails;
