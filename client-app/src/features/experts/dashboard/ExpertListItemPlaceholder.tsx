import React from "react";
import { Placeholder, Segment } from "semantic-ui-react";

export default function ExpertListItemPlaceholder() {
  return (
    <Placeholder fluid>
      <Segment.Group>
        <Segment>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
        <Segment>
          <Placeholder.Line />
          <Placeholder.Line />
        </Segment>
      </Segment.Group>
    </Placeholder>
  );
}
