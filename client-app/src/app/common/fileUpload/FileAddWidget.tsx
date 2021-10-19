import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import FileWidgetDropzone from "./FileWidgetDropzone";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

interface Props {
  addFile: (file: Blob) => void;
}

export default observer(function FileAddWidget({ addFile }: Props) {
  const {
    profileStore: { loading, uploading },
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

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add File" />
        <FileWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      {files && files.length > 0 && (
        <Grid.Column width={4}>
          {files.map((file: any) => {
            return file.type.startsWith("image") ? (
              <Image src={URL.createObjectURL(file)} />
            ) : (
              <Document
                file={URL.createObjectURL(files[0])}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            );
          })}
        </Grid.Column>
      )}
    </Grid>
  );
});
