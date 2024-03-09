"use client";

import { Spinner } from "@/components/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex-center-center min-h-[50vh]">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
