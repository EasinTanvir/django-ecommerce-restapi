import React from "react";
import CategoryItem from "./CategoryItem";
import Container from "@/components/Container";

const CategoryList = ({ categories }) => {
  return (
    <Container>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, i) => (
          <CategoryItem key={i} category={category} />
        ))}
      </div>
    </Container>
  );
};

export default CategoryList;
