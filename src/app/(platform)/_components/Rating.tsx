import React from "react";
import { FaStar } from "react-icons/fa";

type RatingProps = {
  voteAverage: number;
};
const Rating: React.FC<RatingProps> = ({ voteAverage }) => {
  //rounding the vote average to the nearest half
  const roundedRating: number = Math.round(voteAverage * 2) / 2;

  //   generating stars based on the just created roundedRating:
  const stars: JSX.Element[] = [];
  // using a for loop
  for (let i = 1; i <= 10; i++) {
    // for full star
    if (i <= roundedRating) {
      stars.push(<FaStar className="text-yellow-500" key={i} />);
    } else if (i - roundedRating < 1) {
      // half star
      stars.push(
        <span key={i} className="half-star">
          <FaStar className="text-yellow-500" />
        </span>
      );
    } else {
      // empty star
      stars.push(<FaStar key={i} className="text-gray-400" />);
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Rating;
