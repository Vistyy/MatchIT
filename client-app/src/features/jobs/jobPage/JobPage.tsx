import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import DeleteJobButton from "../DeleteJobButton";
import JobAttachmentsSegment from "./JobAttachmentsSegment";
import JobBidsSegment from "./JobBidsSegment";
import JobDetailsSegment from "./JobDetailsSegment";

export default observer(function JobPage() {
  const { id } = useParams<{ id: string }>();
  const {
    jobStore: { loadJob, loadingJob, job, resetState, isEmployer },
  } = useStore();

  useEffect(() => {
    resetState();
    loadJob(id);
  }, [loadJob, id, resetState]);

  if (loadingJob) return <LoadingComponent content="Loading job details..." />;

  return (
    <Grid>
      <Grid.Column width="16">
        {job && (
          <Segment.Group>
            <JobDetailsSegment job={job} />
            {job.attachments.length > 0 && (
              <JobAttachmentsSegment attachments={job.attachments} />
            )}
            {isEmployer && job.jobBids.length > 0 && (
              <JobBidsSegment jobBids={job.jobBids} />
            )}
            {isEmployer && <DeleteJobButton jobId={job.id} />}
          </Segment.Group>
        )}
      </Grid.Column>
    </Grid>
  );
});
