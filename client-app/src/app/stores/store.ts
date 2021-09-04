import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ExpertStore from "./expertStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  userStore: UserStore;
  expertStore: ExpertStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  userStore: new UserStore(),
  expertStore: new ExpertStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
