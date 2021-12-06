import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Input, Segment } from "semantic-ui-react";
import FileAddWidget from "../../../../app/common/fileUpload/FileAddWidget";
import { useStore } from "../../../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function PortfolioForm({ setEditMode }: Props) {
  const {
    fileStore: { temporaryFiles, resetState },
    profileStore: { addPortfolioItem },
  } = useStore();
  const [portfolioItemDescription, setPortfolioItemDescription] =
    useState<string>("");

  function handlePortfolioItemDescriptionChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setPortfolioItemDescription(e.target.value);
  }

  function handleAddPortfolioItem() {
    addPortfolioItem(temporaryFiles, portfolioItemDescription);
    resetState();
    setEditMode(false);
  }

  return (
    <Grid style={{ margin: "0" }}>
      <FileAddWidget />
      <Grid.Row>
        <Input
          placeholder="Short description (optional)"
          size="huge"
          style={{ width: "100%" }}
          value={portfolioItemDescription}
          onChange={handlePortfolioItemDescriptionChange}
        />
      </Grid.Row>
      <Grid.Row>
        <Button
          content="Add"
          size="big"
          disabled={temporaryFiles.size < 1}
          className="positive--custom becomeExpert-addButton"
          style={{ fontSize: "1.35em" }}
          onClick={handleAddPortfolioItem}
        />
        <Button
          content="Cancel"
          size="big"
          style={{ fontSize: "1.35em" }}
          onClick={() => setEditMode(false)}
        />
      </Grid.Row>
    </Grid>
  );
});
