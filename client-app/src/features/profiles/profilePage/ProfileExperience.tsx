import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item } from "semantic-ui-react";
import { ExperienceItem } from "../../../app/models/profile";
import ExperienceItemElement from "../profileItemElements/ExperienceItemElement";

interface Props {
  experience: ExperienceItem[];
}

export default observer(function ProfileExperience({ experience }: Props) {
  return (
    <>
      <Header as="h1">Experience</Header>
      {experience && (
        <Item.Group>
          {experience.map((experienceItem) => (
            <ExperienceItemElement key={experienceItem.id} experienceItem={experienceItem} />
          ))}
        </Item.Group>
      )}
    </>
  );
});
