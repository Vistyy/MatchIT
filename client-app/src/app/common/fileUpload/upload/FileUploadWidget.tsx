import React from "react";
import { Grid } from "semantic-ui-react";
import { UserFile } from "../../../models/profile";
import FileUploadWidgetDropzone from "./FileUploadWidgetDropzone";

interface Props {
  uploadFile: (file: UserFile) => void;
  maxFiles?: number;
}

export default function FileUploadWidget({ uploadFile, maxFiles = 5 }: Props) {
  return (
    <>
      <FileUploadWidgetDropzone uploadFile={uploadFile} />
    </>
  );
}
