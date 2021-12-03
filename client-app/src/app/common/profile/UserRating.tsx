import React from "react";
import { Rating } from "semantic-ui-react";

interface Props {
  rating: number;
  disabled?: boolean;
}

export default function UserRating({ rating, disabled}: Props) {
  return (
    <Rating icon="star" disabled={disabled} maxRating="5" rating={rating} />
  );
}
