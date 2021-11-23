import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { ExperienceItem } from "../../../app/models/profile";
import ExperienceItemElement from "../profileItemElements/ExperienceItemElement";

interface Props {
  experience: ExperienceItem[];
}

export default observer(function ProfileExperience({ experience }: Props) {
  return (
    <Grid.Row>
      <Header as="h1">Experience</Header>
      {experience && (
        <Item.Group>
          {experience.map((experienceItem) => (
            <ExperienceItemElement key={experienceItem.id} experienceItem={experienceItem} />
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
