import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import JobListItem from "./JobListItem";

export default observer(function () {
  const {
    jobStore: { jobArray },
  } = useStore();
  return (
    <>
      {jobArray.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </>
  );
});
