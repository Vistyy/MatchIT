import { makeAutoObservable } from "mobx";

export interface Modal {
  open: boolean;
  body: JSX.Element | null;
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined;
}
export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    size: undefined,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (
    content: JSX.Element,
    size:
      | "mini"
      | "tiny"
      | "small"
      | "large"
      | "fullscreen"
      | undefined = "mini"
  ) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.size = size;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
