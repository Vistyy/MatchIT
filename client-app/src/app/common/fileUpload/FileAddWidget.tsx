import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import FileWidgetDropzone from "./FileWidgetDropzone";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import { v4 as uuid } from "uuid";

interface Props {
  addFile: (file: Blob) => void;
}

export default observer(function FileAddWidget({ addFile }: Props) {
  const {
    profileStore: { loading, uploading, temporaryFiles },
  } = useStore();
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  useEffect(() => {
    console.log(files[0]);
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    setLoader(loading || uploading);
  }, [loading, uploading]);

  useEffect(() => {
    files.forEach((file) => {
      temporaryFiles.set(uuid(), file);
      console.log(file);
    });
  }, [files, temporaryFiles]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <FileWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
      </Grid.Row>
      {temporaryFiles && temporaryFiles.size > 0 && (
        <Grid.Column width={16}>
          {Array.from(temporaryFiles.values()).map((file: any) => {
            return file.type.startsWith("image") ? (
              <Image
                src={URL.createObjectURL(file)}
                size={"small"}
                style={{ display: "inline-block" }}
              />
            ) : (
              <Document
                file={file.preview}
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode="svg"
              >
                <Page pageNumber={1} scale={0.2} />
              </Document>
            );
          })}
        </Grid.Column>
      )}
    </Grid>
  );
});
