import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddNewButton from "../profileItemElements/AddNewButton";
import PortfolioItemElement from "../profileItemElements/PortfolioItemElement";
import PortfolioForm from "./forms/PortfolioForm";

export default observer(function PortfolioSegment() {
  const { profileStore } = useStore();
  const { profile } = profileStore;

  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <Header>Portfolio</Header>
      {editMode ? (
        <PortfolioForm />
      ) : (
        <AddNewButton
          segmentName="Portfolio Item"
          onClick={() => setEditMode(true)}
        />
      )}
      {profile &&
        profile.portfolio.map((portfolioItem) => (
          <PortfolioItemElement
            key={portfolioItem.id}
            portfolioItem={portfolioItem}
          />
        ))}
    </>
  );
});
