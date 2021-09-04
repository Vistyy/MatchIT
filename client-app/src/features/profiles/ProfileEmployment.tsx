import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { EmploymentItem } from "../../app/models/profile";
import { format } from "date-fns";

interface Props {
  employment: EmploymentItem[];
}

export default observer(function ProfileEmployment({ employment }: Props) {
  return (
    <Grid.Row>
      <Header as="h1">Employment</Header>
      {employment && (
        <Item.Group>
          {employment.map((employmentItem) => (
            <Item key={employmentItem.id}>
              <Item.Content>
                <Item.Header as="h2">
                  {employmentItem.description.title}
                </Item.Header>
                <Item.Extra as="h4" style={{ color: "rgba(0,0,0,0.7)" }}>
                  {employmentItem.description.summary}
                </Item.Extra>
                <Item.Meta>{`${format(
                  new Date(employmentItem.employedFrom),
                  "yyyy-MM-dd"
                )} - ${
                  employmentItem.employedTo
                    ? format(new Date(employmentItem.employedTo), "yyyy-MM-dd")
                    : "Currently"
                }`}</Item.Meta>
                <Item.Description>
                  <pre>{`${employmentItem.description.formattedText}`}</pre>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
