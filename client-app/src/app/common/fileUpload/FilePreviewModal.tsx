import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Image, Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";

export default observer(function FilePreviewModal() {
  const { fileStore } = useStore();

  useEffect(() => {
    console.log(fileStore.modal.file);
  }, [fileStore.modal.file]);

  return (
    <Modal
      className="modal-file-preview"
      open={fileStore.modal.open}
      onClose={fileStore.closeFileModal}
      closeIcon
    >
      <Modal.Content>
        {fileStore.modal.file ? (
          fileStore.modal.file.type.startsWith("image") ? (
            <Image src={fileStore.modal.file.preview} />
          ) : (
            <Document file={fileStore.modal.file.preview}>
              <Page pageNumber={1} />
            </Document>
          )
        ) : (
          fileStore.modal.body
        )}
      </Modal.Content>
    </Modal>
  );
});
