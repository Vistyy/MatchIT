import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ExpertStore from "./expertStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";
import FileStore from "./fileStore";

interface Store {
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  userStore: UserStore;
  expertStore: ExpertStore;
  fileStore: FileStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  userStore: new UserStore(),
  expertStore: new ExpertStore(),
  fileStore: new FileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
