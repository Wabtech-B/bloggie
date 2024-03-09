import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex-align-center">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <h1 className="text-xl hidden md:block">Bloggie</h1>
    </Link>
  );
};

export default Logo;
