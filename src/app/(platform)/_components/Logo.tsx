import React from "react";

const Logo = () => {
  // Solved by Andre = added the slash / before the images to serve from the root
  return (
    <img
      src="/images/netflix-logo-removebg-preview.png"
      alt="Logo"
      className="h-20"
    />
  );
};

export default Logo;
