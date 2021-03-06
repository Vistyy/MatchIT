import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header, Item } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import EducationItemElement from "../../profileItemElements/EducationItemElement";
import EducationForm from "../forms/EducationForm";

export default observer(function EducationSegment() {
  const {
    profileStore: { editedProfile },
  } = useStore();
  const [editEducationMode, setEditEducationMode] = useState(false);
  return (
    <>
      <Header as="h1">Education</Header>
      {editEducationMode ? (
        <EducationForm setEditMode={setEditEducationMode} />
      ) : (
        <AddNewButton
          segmentName="Education Item"
          onClick={() => setEditEducationMode(true)}
        />
      )}
      <Item.Group>
        {editedProfile &&
          editedProfile.education.map((educationItem) => (
            <EducationItemElement
              key={educationItem.id}
              educationItem={educationItem}
            />
          ))}
      </Item.Group>
    </>
  );
});
