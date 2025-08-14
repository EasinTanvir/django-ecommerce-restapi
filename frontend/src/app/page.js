import api from "@/api/api";
import React from "react";

const HomePage = async () => {
  const { data } = await api.get("/product/all");
  console.log("user", data);
  return <div>HomePage</div>;
};

export default HomePage;
