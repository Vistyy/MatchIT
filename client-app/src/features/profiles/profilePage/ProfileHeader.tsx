import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Item,
  Segment,
  Transition,
  Image,
  Label,
  Card,
} from "semantic-ui-react";
import FileUploadWidget from "../../../app/common/fileUpload/upload/FileUploadWidget";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileHeader() {
  const {
    modalStore,
    profileStore: { uploadPhoto, deletePhoto, isCurrentUser, profile, addCV },
    userStore: { isLoggedIn },
    fileStore: { openFilePreviewModal },
  } = useStore();
  const [visible, setVisible] = useState(false);
  const [addCVMode, setAddCVMode] = useState(false);

  useEffect(() => {
    if (profile && profile.cv) {
      setAddCVMode(false);
    }
  }, [profile, profile?.cv]);

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
          <Grid.Column width="10">
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
          <Grid.Column width="2" />
          <Grid.Column width="4">
            {!profile.cv ? (
              <>
                {!addCVMode ? (
                  <Button
                    content="Add CV"
                    floated="right"
                    onClick={() => setAddCVMode(true)}
                  />
                ) : (
                  <FileUploadWidget uploadFile={addCV} />
                )}
              </>
            ) : (
              <Card className="file-thumbnail-card">
                <Image
                  src={
                    profile.cv.url.endsWith(".pdf")
                      ? profile.cv.url
                          .slice()
                          .replace(new RegExp(".pdf$"), ".png")
                      : profile.cv.url
                  }
                  size={"small"}
                  style={{ display: "inline-block" }}
                />
                <div
                  className="overlay asAButton"
                  onClick={() => openFilePreviewModal(profile.cv)}
                ></div>
              </Card>
            )}
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
});
