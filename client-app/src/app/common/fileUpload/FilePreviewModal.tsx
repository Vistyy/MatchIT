import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Image, Label, Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

export default observer(function FilePreviewModal() {
  const { fileStore } = useStore();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  function handlePrevPage() {
    if (pageNumber !== 1) setPageNumber((prevValue) => prevValue - 1);
  }

  function handleNextPage() {
    setPageNumber((prevValue) => prevValue + 1);
  }

  return (
    <Modal
      className="modal-file-preview"
      open={fileStore.modal.open}
      onClose={() => {
        fileStore.closeFileModal();
        setPageNumber(1);
      }}
      closeIcon
      // size={fileStore.modal.size}
    >
      <Modal.Content>
        {fileStore.modal.file ? (
          fileStore.modal.file.resourceType.startsWith("image") ? (
            <Image src={fileStore.modal.file.url} size="huge" />
          ) : (
            <Document
              file={fileStore.modal.file.url}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
              <Button.Group
                className="pdfNavigation-buttons"
                style={{ boxShadow: " 0 30px 40px 0 rgba(16, 36, 94, 0.2)" }}
              >
                <Button
                  icon="chevron left"
                  onClick={handlePrevPage}
                  className={pageNumber === 1 ? "disabled" : ""}
                />
                <Label
                  style={{ margin: 0, cursor: "default" }}
                  content={`${pageNumber} of ${numPages}`}
                />
                <Button
                  icon="chevron right"
                  onClick={handleNextPage}
                  className={pageNumber === numPages ? "disabled" : ""}
                />
              </Button.Group>
            </Document>
          )
        ) : (
          fileStore.modal.body
        )}
      </Modal.Content>
    </Modal>
  );
});
