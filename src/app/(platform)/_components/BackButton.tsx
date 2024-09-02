import Link from "next/link";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
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
        <ClipLoader size={20} color="#000" />
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
