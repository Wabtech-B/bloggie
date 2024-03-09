"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const GoBack = () => {
  const handleGoBack = () => {
    if (window !== undefined) {
      window.history.back();
    }
  };
  return (
    <div>
      <Button
        asChild
        variant="secondary"
        className="mt-3 mb-2"
        onClick={handleGoBack}
      >
        <div className="cursor-pointer">
          <ArrowLeft className="mr-2 w-4 h-4" /> Go Back
        </div>
      </Button>
    </div>
  );
};

export default GoBack;
