import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import AddNewButton from "../../profileItemElements/AddNewItemButton";
import CertificationElement from "../../profileItemElements/CertificationElement";
import CertificationForm from "../forms/CertificationForm";

export default observer(function CertificationSegment() {
  const {
    profileStore: { profile },
  } = useStore();

  const [editCertificationMode, setEditCertificationMode] = useState(false);
  return (
    <>
      <Header>Certification</Header>
      {editCertificationMode ? (
        <CertificationForm setEditMode={setEditCertificationMode} />
      ) : (
        <AddNewButton
          segmentName="Certificate"
          onClick={() => setEditCertificationMode(true)}
        />
      )}
      {profile &&
        profile.certifications.map((certificate) => (
          <CertificationElement
            key={certificate.id}
            certificate={certificate}
          />
        ))}
    </>
  );
});
