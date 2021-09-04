import React from "react";
import { Button, Placeholder, Segment } from "semantic-ui-react";

export default function ExpertListItemPlaceholder() {
  return (
    <>
      <Placeholder>
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment>
            <Placeholder.Line />
            <Placeholder.Line />
          </Segment>
          <Segment secondary style={{ minHeight: 70 }} />
          <Segment clearing>
            <Button disabled color="blue" floated="right" content="View" />
          </Segment>
        </Segment.Group>
      </Placeholder>
    </>
  );
}
