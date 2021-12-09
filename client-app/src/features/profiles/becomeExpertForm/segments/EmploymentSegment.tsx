import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import EmploymentItemElement from "../../profileItemElements/EmploymentItemElement";
import EmploymentForm from "../forms/EmploymentForm";

export default observer(function EmploymentSegment() {
  const {
    profileStore: { editedProfile },
  } = useStore();
  const [editEmploymentMode, setEditEmploymentMode] = useState(false);
  return (
    <>
      <Header>Employment</Header>
      {editEmploymentMode ? (
        <EmploymentForm setEditMode={setEditEmploymentMode} />
      ) : (
        <AddNewButton
          segmentName="Employment Item"
          onClick={() => setEditEmploymentMode(true)}
        />
      )}
      {editedProfile &&
        editedProfile.employment.map((employmentItem) => (
          <EmploymentItemElement
            key={employmentItem.id}
            employmentItem={employmentItem}
          />
        ))}
    </>
  );
});
