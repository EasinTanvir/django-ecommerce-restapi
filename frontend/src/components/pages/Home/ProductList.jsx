import React from "react";

import ProductItem from "./ProductItem";
import Container from "@/components/Container";

const ProductList = ({ products }) => {
  return (
    <Container>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, i) => (
          <ProductItem key={i} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductList;
