import React from "react";

import ProductDetails from "@/components/pages/productDetails/ProductDetails";
import { products } from "@/utils/data";

const ProductDetailPage = async ({ params }) => {
  const { pId } = await params;
  return (
    <div>
      <ProductDetails product={products[0]} />
    </div>
  );
};

export default ProductDetailPage;
