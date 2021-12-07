import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { Button, Header, Input } from "semantic-ui-react";
import AccountLinksForm from "../forms/AccountLinksForm";

export default observer(function AccountLinksSegment() {
  const {
    profileStore: { profile, loadingLinks },
  } = useStore();

  const [linkEditMode, setLinkEditMode] = useState(false);

  return (
    <>
    <Header>Profile links</Header>
      {linkEditMode ? (
        <AccountLinksForm setEditMode={setLinkEditMode} profile={profile!} />
      ) : (
        <div className="ui form">
          <div className="accountLink-input__disabled field">
            <label>Link to your GitHub Profile</label>
            {loadingLinks ? (
              <Input
                className="loading--custom"
                fluid
                placeholder="Loading..."
              />
            ) : (
              <Input
                placeholder="Link to your GitHub Profile"
                disabled
                value={profile?.githubProfileUrl || ""}
                loading={loadingLinks}
              ></Input>
            )}
          </div>
          <div className="accountLink-input__disabled field">
            <label>Link to your LinkedIn Profile</label>
            {loadingLinks ? (
              <Input
                className="loading--custom"
                fluid
                placeholder="Loading..."
              />
            ) : (
              <Input
                placeholder="Link to your LinkedIn Profile"
                disabled
                value={profile?.linkedInProfileUrl || ""}
                loading={loadingLinks}
              />
            )}
          </div>
          <Button
            content="Edit"
            size="big"
            style={{ fontSize: "1.35em" }}
            onClick={() => setLinkEditMode(true)}
            className="positive--custom"
          />
        </div>
      )}
    </>
  );
});
