import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductItem = ({ product }) => {
  return (
    <Link key={product.id} href={`/product/${product.id}`}>
      <Card className="hover:shadow-lg transition rounded-2xl overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src="/p1.jpg"
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {product.title}
          </CardTitle>
          <p className="text-sm text-gray-500">{product.category_info?.name}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{product.des}</p>
          <p className="font-bold text-brand">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
