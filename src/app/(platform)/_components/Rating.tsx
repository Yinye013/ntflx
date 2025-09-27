import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

type RatingProps = {
  voteAverage: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
};

const Rating: React.FC<RatingProps> = ({
  voteAverage,
  maxStars = 5,
  size = "md",
  showValue = false,
  className = "",
}) => {
  // Convert 0-10 rating to 0-maxStars scale
  const normalizedRating = (voteAverage / 10) * maxStars;
  const roundedRating = Math.round(normalizedRating * 2) / 2;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const stars: JSX.Element[] = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= roundedRating) {
      // Full star
      stars.push(
        <FaStar
          key={i}
          className={`text-yellow-400 ${sizeClasses[size]}`}
          aria-hidden="true"
        />
      );
    } else if (i - roundedRating === 0.5) {
      // Half star
      stars.push(
        <FaStarHalfAlt
          key={i}
          className={`text-yellow-400 ${sizeClasses[size]}`}
          aria-hidden="true"
        />
      );
    } else {
      // Empty star
      stars.push(
        <FaStar
          key={i}
          className={`text-gray-400 ${sizeClasses[size]}`}
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`Rating: ${voteAverage} out of 10 stars`}
    >
      <div className="flex">{stars}</div>
      {showValue && (
        <span className={`text-gray-600 ml-1 ${sizeClasses[size]}`}>
          ({voteAverage.toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default Rating;
