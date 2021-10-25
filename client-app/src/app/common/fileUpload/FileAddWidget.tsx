import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import FileWidgetDropzone from "./FileWidgetDropzone";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

export default observer(function FileAddWidget() {
  const {
    profileStore: { loading, uploading },
    fileStore: { temporaryFiles, addFiles: addFile, openFilePreviewModal },
    modalStore: { openModal },
  } = useStore();
  const [loader, setLoader] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  // useEffect(() => {
  //   return () => {
  //     temporaryFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
  //   };
  // }, [temporaryFiles]);

  useEffect(() => {
    setLoader(loading || uploading);
  }, [loading, uploading]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <FileWidgetDropzone addFiles={addFile} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={16}>
        {temporaryFiles && temporaryFiles.size > 0 && (
          <Card.Group>
            {Array.from(temporaryFiles.entries()).map(([fileId, file]) => {
              return (
                <div
                  key={fileId}
                  className="file-thumbnail-container asAButton"
                >
                  <Card
                    centered
                    style={{ maxWidth: "150px", marginBottom: "6px" }}
                    className="file-thumbnail-card"
                    onClick={() => openFilePreviewModal(file)}
                  >
                    {file.type.startsWith("image") ? (
                      <Image
                        src={file.preview}
                        size={"small"}
                        style={{ display: "inline-block" }}
                      />
                    ) : (
                      <Document
                        file={file.preview}
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="svg"
                      >
                        <Page pageNumber={1} width={150} />
                      </Document>
                    )}
                    <div className="overlay"></div>
                  </Card>
                  <p>{file.name}</p>
                </div>
              );
            })}
          </Card.Group>
        )}
      </Grid.Column>
    </Grid>
  );
});
