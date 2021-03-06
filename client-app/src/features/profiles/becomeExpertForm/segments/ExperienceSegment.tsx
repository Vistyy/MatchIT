import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header, Item } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import ExperienceItemElement from "../../profileItemElements/ExperienceItemElement";
import ExperienceForm from "../forms/ExperienceForm";

export default observer(function ExperienceSegment() {
  const {
    profileStore: { editedProfile },
  } = useStore();

  const [editExperienceMode, setEditExperienceMode] = useState(false);
  return (
    <>
      <Header as="h1">Experience</Header>
      {editExperienceMode ? (
        <ExperienceForm setEditMode={setEditExperienceMode} />
      ) : (
        <AddNewButton
          segmentName="Experience Item"
          onClick={() => setEditExperienceMode(true)}
        />
      )}
      <Item.Group>
        {editedProfile &&
          editedProfile.experience.map((experienceItem) => (
            <ExperienceItemElement
              key={experienceItem.id}
              experienceItem={experienceItem}
            />
          ))}
      </Item.Group>
    </>
  );
});
