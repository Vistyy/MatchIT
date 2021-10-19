import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { EmploymentItem } from "../../app/models/profile";
import { format } from "date-fns";
import EmploymentItemElement from "./profileItemElements/EmploymentItemElement";

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
            <EmploymentItemElement
              key={employmentItem.id}
              employmentItem={employmentItem}
            />
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
