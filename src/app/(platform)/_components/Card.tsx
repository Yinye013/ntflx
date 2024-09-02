import Link from "next/link";
import React from "react";
type CardProps = {
  originalName: string;
  characterName: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ originalName, characterName, image }) => {
  return (
    <Link href="#">
      <div className="shadow-lg rounded-lg mb-9 cursor-pointer  text-white border-white">
        <img
          src={image}
          alt={originalName}
          className="w-[410px] lg:w-[350px] h-[400px]"
        />
        <div className="flex flex-col justify-center items-center p-6 text-[15px] tracking-normal">
          <p>
            <span className="font-bold  text-[15px] inline-block">
              {originalName}
            </span>
          </p>
          <p>as</p>
          <p>
            <span className="font-semibold">{characterName} </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
