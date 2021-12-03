import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import ExpertListItem from "./ExpertListItem";

export default observer(function ExpertList() {
  const {
    expertStore: { expertArray },
  } = useStore();

  return (
    <>
      {expertArray.slice().map((expert) => (
        <ExpertListItem key={expert.userName} expert={expert} />
      ))}
    </>
  );
});
