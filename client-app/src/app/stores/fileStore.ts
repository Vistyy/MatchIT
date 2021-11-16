import { makeAutoObservable } from "mobx";
import { v4 as uuid } from "uuid";
import { UserFile } from "../models/profile";
import { Modal } from "./modalStore";

interface FileModal extends Modal {
  file: UserFile | undefined;
}

export default class FileStore {
  modal: FileModal = {
    open: false,
    body: null,
    size: undefined,
    file: undefined,
  };
  temporaryFiles = new Map<string, UserFile>();

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = (files: any[]) => {
    files.forEach((file) => {
      const fileId = uuid();
      this.temporaryFiles.set(fileId, {id: fileId, url: file.preview, fileType: file.type});
    });
  };

  deleteFiles = (filesToDelete: string[]) => {
    filesToDelete.forEach((fileToDeleteId) => {
      URL.revokeObjectURL(this.temporaryFiles.get(fileToDeleteId)!.url);
      this.temporaryFiles.delete(fileToDeleteId);
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
