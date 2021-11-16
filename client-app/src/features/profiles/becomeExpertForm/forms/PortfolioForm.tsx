import { Formik } from "formik";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Image, Input } from "semantic-ui-react";
import FileAddWidget from "../../../../app/common/fileUpload/FileAddWidget";
import PhotoUploadWidget from "../../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function PortfolioForm({ setEditMode }: Props) {
  const {
    fileStore: { temporaryFiles },
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
    runInAction(() => temporaryFiles.clear());
    setEditMode(false);
  }

  return (
    <Grid>
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
          className={`positive--custom becomeExpert-addButton ${
            temporaryFiles.size > 0 ? "" : "disabled"
          }`}
          style={{ fontSize: "1.35em" }}
          onClick={handleAddPortfolioItem}
        />
      </Grid.Row>
    </Grid>
  );
});
