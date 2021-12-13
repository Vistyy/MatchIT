import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
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
  uploading = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetState = () => {
    this.temporaryFiles.clear();
  };

  addFiles = (files: any[]) => {
    files.forEach((file) => {
      const fileId = uuid();
      this.temporaryFiles.set(fileId, {
        id: fileId,
        url: file.preview,
        resourceType: file.type,
      });
    });
  };

  deleteFiles = (filesToDelete: string[]) => {
    filesToDelete.forEach((fileToDeleteId) => {
      URL.revokeObjectURL(this.temporaryFiles.get(fileToDeleteId)!.url);
      this.temporaryFiles.delete(fileToDeleteId);
    });
  };

  uploadFile = async (file: UserFile) => {
    this.uploading = true;
    try {
      const blob = await fetch(file.url).then((r) => r.blob());
      const response = await agent.Files.uploadFile(blob);
      file.id = response.data.id;
      file.url = response.data.url;
      runInAction(() => (this.uploading = false));
      return file;
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
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
