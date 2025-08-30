import Link from "next/link";
import React from "react";

type CardProps = {
  castId?: number;
  originalName: string;
  characterName: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ castId, originalName, characterName, image }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/not-found.jpg';
  };

  return (
    <Link 
      href={castId ? `/person/${castId}` : "#"}
      className={`group ${castId ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 w-full">
        {/* Profile Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-700">
          <img
            src={image}
            alt={originalName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        
        {/* Cast Information */}
        <div className="p-4 space-y-2">
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm md:text-base truncate">
              {originalName}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm">as</p>
            <p className="text-gray-300 font-medium text-xs md:text-sm truncate">
              {characterName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
