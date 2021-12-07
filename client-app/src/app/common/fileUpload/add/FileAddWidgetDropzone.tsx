import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";
import { UserFile } from "../../../models/profile";

interface Props {
  files: Map<string, UserFile>;
  addFiles: (files: any) => void;
  maxFiles: number;
}

export default observer(function FileAddWidgetDropzone({
  files,
  addFiles,
  maxFiles,
}: Props) {
  const dzStyles = {
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: 200,
  };

  const dzActive = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (files.size + acceptedFiles.length <= maxFiles)
        addFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
    },
    [addFiles, maxFiles, files.size]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, application/pdf",
    maxFiles,
  });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : { ...dzStyles }}
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content={`Drop files here (max. ${maxFiles})`} />
    </div>
  );
});
