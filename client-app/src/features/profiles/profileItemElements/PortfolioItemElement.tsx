import React from "react";
import { Item } from "semantic-ui-react";
import { PortfolioItem } from "../../../app/models/profile";

interface Props {
  portfolioItem: PortfolioItem;
}

export default function PortfolioItemElement({ portfolioItem }: Props) {
  return (
    <Item>
      <Item.Image src={portfolioItem.url} />
      <Item.Header>{portfolioItem.description?.title}</Item.Header>
    </Item>
  );
}
