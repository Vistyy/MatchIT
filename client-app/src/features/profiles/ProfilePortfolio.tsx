import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { PortfolioItem } from "../../app/models/profile";

interface Props {
  portfolio: PortfolioItem[];
}

export default observer(function ProfilePortfolio({ portfolio }: Props) {
  return <Grid.Row>Portfolio</Grid.Row>;
});
