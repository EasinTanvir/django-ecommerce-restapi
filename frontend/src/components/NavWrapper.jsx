"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Navbar from "./Navbar";

const NavWrapper = () => {
  const path = usePathname();
  if (path.includes("dashboard")) return;
  return <Navbar />;
};

export default NavWrapper;
