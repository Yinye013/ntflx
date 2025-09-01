import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const [linkLoading, setLinkLoading] = useState(false);
  const handleLoading = () => {
    setLinkLoading(true);
  };

  return (
    <Link
      href="/"
      onClick={handleLoading}
      className="bg-white lg:w-[12%] flex items-center justify-center gap-3 rounded-md mb-10  lg:px-6 lg:py-3"
    >
      {linkLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
      ) : (
        <>
          <FaArrowLeft />
          <p>Back</p>
        </>
      )}
    </Link>
  );
};

export default BackButton;
