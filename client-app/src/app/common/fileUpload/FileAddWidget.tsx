import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Card, Checkbox, Grid, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import FileWidgetDropzone from "./FileWidgetDropzone";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";

export default observer(function FileAddWidget() {
  const {
    profileStore: { loading, uploading },
    fileStore: { temporaryFiles, addFiles, openFilePreviewModal },
    modalStore: { openModal },
  } = useStore();
  const [loader, setLoader] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteMode, setDeleteMode] = useState(0);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  function handleDeleteMode(e: SyntheticEvent, { checked }: any) {
    if (checked) {
      setDeleteMode((prevState) => prevState + 1);
    } else {
      setDeleteMode((prevState) => prevState - 1);
    }
  }

  useEffect(() => {
    setLoader(loading || uploading);
  }, [loading, uploading]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <FileWidgetDropzone addFiles={addFiles} />
        </Grid.Column>
        <Grid.Column width={3}>
          {temporaryFiles && temporaryFiles.size > 0 && deleteMode > 0 && (
            <Icon
              size={"huge"}
              className="asAButton"
              name={"trash alternate"}
              onClick={handleDeleteMode}
            />
          )}
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
                    style={{
                      maxWidth: "150px",
                      marginBottom: "6px",
                      maxHeight: "212px",
                      overflow: "hidden",
                    }}
                    className="file-thumbnail-card"
                  >
                    <Checkbox
                      style={{
                        zIndex: "1",
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                      }}
                      onChange={handleDeleteMode}
                    />
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
                      >
                        <Page pageNumber={1} width={150} />
                      </Document>
                    )}
                    <div
                      className="overlay"
                      onClick={() => openFilePreviewModal(file)}
                    ></div>
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
