import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import JobListItem from "./JobListItem";

export default observer(function () {
  const {
    jobStore: { jobRegistry },
  } = useStore();
  return (
    <>
      {Array.from(jobRegistry).map(([id, job]) => (
        <JobListItem key={id} job={job} />
      ))}
    </>
  );
});
