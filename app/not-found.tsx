import GoBack from "@/components/goback";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex-col min-h-screen text-center flex-center-center">
      <div className="relative w-[400px] h-[400px]">
        <Image src="/404.png" alt="Not Found" className="object-contain" fill />
      </div>
      <h1 className="text-6xl font-bold opacity-50">Page Not Found</h1>
      <GoBack />
    </div>
  );
};

export default NotFound;
