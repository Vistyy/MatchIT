import { observer } from "mobx-react-lite";
import React from "react";
import { Job } from "../../../app/models/job";
import UserJobListItem from "./UserJobListItem";

interface Props {
  jobArray: Job[];
}

export default observer(function JobList({jobArray}:Props) {
  return (
    <>
      {jobArray.map((job) => (
        <UserJobListItem key={job.id} job={job} />
      ))}
    </>
  );
});
