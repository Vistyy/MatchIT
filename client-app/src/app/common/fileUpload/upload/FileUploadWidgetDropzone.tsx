import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dimmer, Header, Icon, Loader } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";

interface Props {
  uploadFile: (file: any) => void;
}

export default observer(function FileUploadWidgetDropzone({
  uploadFile,
}: Props) {
  const {
    profileStore: { uploading },
  } = useStore();

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
      const file = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      uploadFile(file);
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, application/pdf",
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : { ...dzStyles }}
    >
      <input {...getInputProps()} />
      {!uploading ? (
        <>
          <Icon name="upload" size="huge"/>
          <Header content={`Drop files here (max. 1)`} />
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
});
