import { observer } from "mobx-react-lite";
import React from "react";
import { Job } from "../../../app/models/job";
import JobListItem from "./JobListItem";

interface Props {
  jobArray: Job[];
}

export default observer(function JobList ({jobArray}: Props) {
 
  return (
    <>
      {jobArray.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}
    </>
  );
});
