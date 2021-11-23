import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import ExperienceItemElement from "../../profileItemElements/ExperienceItemElement";
import ExperienceForm from "../forms/ExperienceForm";

export default observer(function ExperienceSegment() {
  const {
    profileStore: { profile },
  } = useStore();

  const [editExperienceMode, setEditExperienceMode] = useState(false);
  return (
    <>
      <Header>Experience</Header>
      {editExperienceMode ? (
        <ExperienceForm setEditMode={setEditExperienceMode} />
      ) : (
        <AddNewButton
          segmentName="Experience Item"
          onClick={() => setEditExperienceMode(true)}
        />
      )}
      {profile &&
        profile.experience.map((experienceItem) => (
          <ExperienceItemElement
            key={experienceItem.id}
            experienceItem={experienceItem}
          />
        ))}
    </>
  );
});
