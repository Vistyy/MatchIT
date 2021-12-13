import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item } from "semantic-ui-react";
import { EducationItem } from "../../../app/models/profile";
import EducationItemElement from "../profileItemElements/EducationItemElement";

interface Props {
  education: EducationItem[];
}

export default observer(function ProfileEducation({ education }: Props) {
  return (
    <>
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
    </>
  );
});
