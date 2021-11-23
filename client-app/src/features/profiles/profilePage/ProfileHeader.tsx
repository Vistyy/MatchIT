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
} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  const {
    modalStore,
    profileStore: { uploadPhoto, deletePhoto, isCurrentUser },
    userStore: { isLoggedIn },
    expertStore: { setSkillPredicate, clearFilter },
  } = useStore();
  const [visible, setVisible] = useState(false);

  function handlePhotoChange(file: Blob) {
    if (isLoggedIn()) {
      if (profile.image) {
        deletePhoto(profile.image)
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
                          <PhotoUploadWidget uploadPhoto={handlePhotoChange} />,
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
                    <Button
                      as={Link}
                      to={`/`}
                      key={skill.id}
                      content={skill.name}
                      onClick={() => {
                        clearFilter();
                        setSkillPredicate(skill.name);
                      }}
                    />
                  ))}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width="4"></Grid.Column>
      </Grid>
    </Segment>
  );
});
