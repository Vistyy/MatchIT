import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Item,
  Segment,
  Transition,
  Image,
  Label,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileHeader() {
  const {
    modalStore,
    profileStore: { uploadPhoto, deletePhoto, isCurrentUser, profile },
    userStore: { isLoggedIn },
    expertStore: { setSkillPredicate, clearFilter },
  } = useStore();
  const [visible, setVisible] = useState(false);

  function handlePhotoChange(file: Blob) {
    if (isLoggedIn()) {
      if (profile!.image) {
        deletePhoto(profile!.image)
          .then(() => uploadPhoto(file))
          .then(() => modalStore.closeModal());
      } else {
        uploadPhoto(file).then(() => modalStore.closeModal());
      }
    } else {
      modalStore.closeModal();
    }
  }

  return (
    <Segment>
      {profile && (
        <Grid>
          <Grid.Column width="12">
            <Item.Group>
              <Item
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
              >
                <Item.Image size="small">
                  <Image
                    src={profile.image?.url || "/assets/user.png"}
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
                  <Item.Extra>
                    {profile.skills.map((skill) => (
                      <Label key={skill.id} content={skill.name} />
                    ))}
                  </Item.Extra>
                  <Item.Description>{profile.bio}</Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width="4"></Grid.Column>
        </Grid>
      )}
    </Segment>
  );
});
