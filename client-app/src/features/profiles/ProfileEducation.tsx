import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { EducationItem } from "../../app/models/profile";
import { format } from "date-fns";
import EducationItemElement from "./profileItemElements/EducationItemElement";

interface Props {
  education: EducationItem[];
}

export default observer(function ProfileEducation({ education }: Props) {
  return (
    <Grid.Row>
      <Header as="h1">Education</Header>
      {education && (
        <Item.Group>
          {education.map((educationItem) => (
            <EducationItemElement
              key={educationItem.id}
              educationItem={educationItem}
            />
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
