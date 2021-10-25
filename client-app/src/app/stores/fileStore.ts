import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import { Modal } from "./modalStore";

interface FileModal extends Modal {
  file: any;
}

export default class FileStore {
  modal: FileModal = {
    open: false,
    body: null,
    size: undefined,
    file: undefined,
  };
  temporaryFiles = new Map<string, any>();

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = (files: Blob[]) => {
    files.forEach((file) => {
      this.temporaryFiles.set(uuid(), file);
    });
  };

  openFilePreviewModal = (
    modalFile: any,
    size:
      | "mini"
      | "tiny"
      | "small"
      | "large"
      | "fullscreen"
      | undefined = "mini"
  ) => {
    this.modal.open = true;
    this.modal.file = modalFile;
    this.modal.size = size;
  };

  closeFileModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
