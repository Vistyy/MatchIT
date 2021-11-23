import React from "react";
import { Header, Segment } from "semantic-ui-react";

interface Props {
  segmentName: string;
  onClick: () => void;
}

export default function AddNewButton({ segmentName, onClick }: Props) {
  return (
    <Segment
      className="becomeExpert--addPlaceholder__hover asAButton"
      style={{ minHeight: "2em" }}
      onClick={onClick}
    >
      <Header
        icon="add"
        content={`Add new ${segmentName}`}
        textAlign="center"
        style={{ lineHeight: "2em" }}
      />
    </Segment>
  );
}
