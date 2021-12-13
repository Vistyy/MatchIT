import { observer } from "mobx-react-lite";
import React from "react";
import { Header } from "semantic-ui-react";
import { PortfolioItem } from "../../../app/models/profile";
import PortfolioItemElement from "../profileItemElements/PortfolioItemElement";

interface Props {
  portfolio: PortfolioItem[];
}

export default observer(function ProfilePortfolio({ portfolio }: Props) {
  return (
    <>
      <Header as="h1">Portfolio</Header>
      {portfolio.map((portfolioItem) => (
        <PortfolioItemElement
          key={portfolioItem.id}
          portfolioItem={portfolioItem}
        />
      ))}
    </>
  );
});
