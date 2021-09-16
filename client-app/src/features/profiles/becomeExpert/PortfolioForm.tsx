import { observer } from "mobx-react-lite";
import React from "react";
import { Header } from "semantic-ui-react";
import FileUploadWidget from "../../../app/common/fileUpload/FileUploadWidget";
import { useStore } from "../../../app/stores/store";

export default observer(function PortfolioForm() {
  const { profileStore } = useStore();
  const { uploadFile, uploading } = profileStore;

  return (
    <>
      <Header>Portfolio</Header>
      <FileUploadWidget uploadFile={uploadFile} />
    </>
  );
});
