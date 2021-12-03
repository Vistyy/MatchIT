import React from "react";
import { Item, Segment } from "semantic-ui-react";
import { JobBid } from "../../../app/models/profile";

interface Props {
  jobBids: JobBid[];
}

export default function JobBidsSegment({ jobBids }: Props) {
  return (
    <Segment>
      {jobBids.map((jobBid) => (
        <Segment raised key={jobBid.id}>
          <Item>
            <Item.Description content={jobBid.description} />
            <Item.Meta content={jobBid.fee} />
            <Item.Header>{jobBid.bidder.userName}</Item.Header>
          </Item>
        </Segment>
      ))}
    </Segment>
  );
}
