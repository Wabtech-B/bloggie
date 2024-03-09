import React from "react";

const Footer = () => {
  return (
    <footer className="flex-center-center text-center py-4 mt-10 border-t">
      <p>&copy;{new Date().getFullYear()} Bloggie. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
