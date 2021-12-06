import { observer } from "mobx-react-lite";
import React from "react";
import { Profile } from "../../../app/models/profile";
import ExpertListItem from "./ExpertListItem";

interface Props {
  expertArray: Profile[];
}

export default observer(function ExpertList({ expertArray }: Props) {
  return (
    <>
      {expertArray.slice().map((expert) => (
        <ExpertListItem key={expert.userName} expert={expert} />
      ))}
    </>
  );
});
