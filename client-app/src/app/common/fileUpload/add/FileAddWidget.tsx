import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Card, Checkbox, Grid, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import { runInAction } from "mobx";
import FileAddWidgetDropzone from "./FileAddWidgetDropzone";

interface Props {
  maxFiles?: number;
}

export default observer(function FileAddWidget({ maxFiles = 5 }: Props) {
  const {
    fileStore: { temporaryFiles, addFiles, deleteFiles, openFilePreviewModal, resetState },
  } = useStore();

  const [deleteMode, setDeleteMode] = useState(0);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);

  function handleDeleteMode(
    e: SyntheticEvent,
    { checked }: any,
    fileId: string
  ) {
    if (checked) {
      setDeleteMode((prevState) => prevState + 1);
      setFilesToDelete((prevArray) => [...prevArray, fileId]);
    } else {
      setDeleteMode((prevState) => prevState - 1);
      setFilesToDelete((prevArray) => prevArray.filter((id) => id !== fileId));
    }
  }

  function handleDelete() {
    deleteFiles(filesToDelete);
    setDeleteMode(0);
    setFilesToDelete([]);
  }

  useEffect(() => {
    return () => {
      runInAction(() => {
        Array.from(temporaryFiles.values()).forEach((file: any) =>
          URL.revokeObjectURL(file.url)
        );
      });
      resetState();
    };
  }, [resetState, temporaryFiles]);

  return (
    <>
      <Grid.Row>
        <Grid.Column width={4}>
          <FileAddWidgetDropzone
            files={temporaryFiles}
            addFiles={addFiles}
            maxFiles={maxFiles}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          {temporaryFiles && temporaryFiles.size > 0 && deleteMode > 0 && (
            <Icon
              size={"huge"}
              className="asAButton"
              name={"trash alternate"}
              onClick={handleDelete}
            />
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          {temporaryFiles && temporaryFiles.size > 0 && (
            <Card.Group>
              {Array.from(temporaryFiles.entries()).map(([fileId, file]) => {
                return (
                  <div key={fileId} className="file-thumbnail-container">
                    <Card centered className="file-thumbnail-card">
                      <Checkbox
                        style={{
                          zIndex: "1",
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                        }}
                        onChange={(e, props) =>
                          handleDeleteMode(e, props, fileId)
                        }
                      />
                      {file.resourceType.startsWith("image") ? (
                        <Image
                          src={file.url}
                          size={"small"}
                          style={{ display: "inline-block" }}
                        />
                      ) : (
                        <Document file={file.url}>
                          <Page pageNumber={1} width={150} />
                        </Document>
                      )}
                      <div
                        className="overlay asAButton"
                        onClick={() => openFilePreviewModal(file)}
                      ></div>
                    </Card>
                  </div>
                );
              })}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid.Row>
    </>
  );
});
