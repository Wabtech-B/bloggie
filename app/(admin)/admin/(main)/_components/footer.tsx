import React from "react";

const Footer = () => {
  return (
    <footer className="flex-center-center text-center py-4">
      <p>&copy;{new Date().getFullYear()} Bloggie. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
