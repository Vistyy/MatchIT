import React, { Fragment } from "react";
import { Segment } from "semantic-ui-react";
import { JobBid } from "../../../app/models/job";
import JobBidsSegmentItem from "./jobBid/JobBidSegmentItem";

interface Props {
  jobBids: JobBid[];
}

export default function JobBidsSegment({ jobBids }: Props) {
  return (
    <Segment>
      {jobBids.map((jobBid) => (
        <Fragment key={jobBid.id}>
          <JobBidsSegmentItem jobBid={jobBid} />
        </Fragment>
      ))}
    </Segment>
  );
}
