"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/Container";

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    // handle add to cart logic here
    alert(`Added ${quantity} ${product.title} to cart`);
  };

  return (
    <Container>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/p1.jpg"
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 mb-4">{product.category_info?.name}</p>
            <p className="text-gray-700 mb-4">{product.des}</p>
            <p className="text-2xl font-bold text-brandColor mb-6">
              ${product.price}
            </p>
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decrement}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={increment}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
            <Button
              className="bg-brandColor text-white hover:bg-purple-800"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
