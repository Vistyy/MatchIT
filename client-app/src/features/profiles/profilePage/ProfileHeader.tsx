import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  Button,
  Grid,
  Item,
  Segment,
  Transition,
  Image,
  Label,
  Icon,
  Menu,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import ProfileCV from "./ProfileCV";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileHeader() {
  const {
    modalStore,
    profileStore: { uploadProfilePhoto, isCurrentUser, profile },
    userStore: { isLoggedIn },
  } = useStore();
  const [visible, setVisible] = useState(false);

  function handlePhotoChange(file: Blob) {
    if (isLoggedIn()) {
      uploadProfilePhoto(file);
    } else {
      modalStore.closeModal();
    }
  }

  return (
    <Segment>
      {profile && (
        <Grid>
          <Grid.Column width="10">
            <Item.Group>
              <Item>
                <Item.Image
                  size="small"
                  onMouseEnter={() => setVisible(true)}
                  onMouseLeave={() => setVisible(false)}
                >
                  <Image
                    src={profile.photo?.url || "/assets/user.png"}
                    style={{
                      border: "1px solid #eaeaea",
                    }}
                  />
                  {isCurrentUser && (
                    <Transition visible={visible}>
                      <Button
                        className="profile-image--icon"
                        icon="edit"
                        onClick={() => {
                          modalStore.openModal(
                            <PhotoUploadWidget
                              uploadPhoto={handlePhotoChange}
                            />,
                            "large"
                          );
                        }}
                      />
                    </Transition>
                  )}
                </Item.Image>
                <Item.Content>
                  <Item.Header as="h1" content={profile.displayName} />
                  <Item.Extra className="profileSkills-skillContainer">
                    {profile.skills.map((skill) => (
                      <Label
                        key={skill.id}
                        content={skill.name}
                        className="profileSkills-skillLabel"
                      />
                    ))}
                  </Item.Extra>
                  <Item.Description>{profile.bio}</Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width="2">
            {profile.githubProfileUrl && (
              <Menu.Item href={profile.githubProfileUrl} target="_blank">
                <Icon name="github" size="big" link style={{ color: "#000" }} />
              </Menu.Item>
            )}
            {profile.linkedInProfileUrl && (
              <Menu.Item href={profile.linkedInProfileUrl} target="_blank">
                <Icon
                  name="linkedin"
                  size="big"
                  link
                  style={{ color: "#0077b5" }}
                />
              </Menu.Item>
            )}
          </Grid.Column>
          <Grid.Column width="1" />
          <Grid.Column width="3">
            <ProfileCV  />
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
});
