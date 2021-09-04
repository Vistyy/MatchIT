import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Item } from "semantic-ui-react";
import { ExperienceItem } from "../../app/models/profile";

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
            <Item key={experienceItem.id}>
              <Item.Content>
                <Item.Header as="h2">
                  {experienceItem.description.title}
                </Item.Header>
                <Item.Extra as="h4" style={{ color: "rgba(0,0,0,0.7)" }}>
                  {experienceItem.description.summary}
                </Item.Extra>
                <Item.Description>
                  <pre>{`${experienceItem.description.formattedText}`}</pre>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      )}
    </Grid.Row>
  );
});
