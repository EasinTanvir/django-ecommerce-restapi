import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const CategoryItem = ({ category }) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="hover:shadow-lg transition rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            {category.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CategoryItem;
