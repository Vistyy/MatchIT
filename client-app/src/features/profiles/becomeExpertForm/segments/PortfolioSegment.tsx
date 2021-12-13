import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import PortfolioItemElement from "../../profileItemElements/PortfolioItemElement";
import PortfolioForm from "../forms/PortfolioForm";

export default observer(function PortfolioSegment() {
  const { profileStore: {editedProfile} } = useStore();

  const [editPortfolioMode, setEditPortfolioMode] = useState(false);

  return (
    <>
      <Header as="h1">Portfolio</Header>
      {editPortfolioMode ? (
        <PortfolioForm setEditMode={setEditPortfolioMode} />
      ) : (
        <AddNewButton
          segmentName="Portfolio Item"
          onClick={() => setEditPortfolioMode(true)}
        />
      )}
      {editedProfile &&
        editedProfile.portfolio.map((portfolioItem) => (
          <PortfolioItemElement
            key={portfolioItem.id}
            portfolioItem={portfolioItem}
          />
        ))}
    </>
  );
});
