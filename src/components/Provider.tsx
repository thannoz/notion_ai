"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};

export default Provider;
