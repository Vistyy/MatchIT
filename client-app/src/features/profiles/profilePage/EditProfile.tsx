import { observer } from "mobx-react-lite";
import React from "react";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ({ setEditMode }: Props) {
  return <> </>;
});
