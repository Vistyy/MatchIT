import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import ExpertListItem from "./ExpertListItem";

export default observer(function ExpertList() {
  const {
    expertStore: { expertRegistry },
  } = useStore();

  return (
    <>
      {Array.from(expertRegistry).map(([id, expert]) => (
        <ExpertListItem key={id} expert={expert} />
      ))}
    </>
  );
});
