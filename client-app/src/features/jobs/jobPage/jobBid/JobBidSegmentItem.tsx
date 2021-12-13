import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import ProfilePopup from "../../../../app/common/profile/ProfilePopup";
import { JobBid } from "../../../../app/models/job";
import { useStore } from "../../../../app/stores/store";

interface Props {
  jobBid: JobBid;
}

export default observer(function JobBidsSegmentItem({ jobBid }: Props) {
  const {
    jobStore: { deleteJobBid, acceptJobBid },
  } = useStore();
  return (
    <Segment raised>
      <Item>
        <Item.Content>
          <Item.Description content={jobBid.description} />
          <Item.Meta content={jobBid.fee} />
          <ProfilePopup profile={jobBid.bidder} />
        </Item.Content>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "2%",
            transform: "translateY(-50%)",
          }}
        >
          <Button
            style={{ marginRight: "15px" }}
            icon="checkmark"
            basic
            color="green"
            size="massive"
            onClick={() => acceptJobBid(jobBid.id)}
          />
          <Button
            icon="close"
            basic
            color="red"
            size="massive"
            onClick={() => deleteJobBid(jobBid.id)}
          />
        </div>
      </Item>
    </Segment>
  );
});
