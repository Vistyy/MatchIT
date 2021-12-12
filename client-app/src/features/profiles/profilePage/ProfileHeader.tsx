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
  Icon,
  Menu,
} from "semantic-ui-react";
import FileUploadWidget from "../../../app/common/fileUpload/upload/FileUploadWidget";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileHeader() {
  const {
    modalStore,
    profileStore: { uploadProfilePhoto, isCurrentUser, profile, addCV },
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
              <Item
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
              >
                <Item.Image size="small">
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
            {!profile.cv ? (
              <>
                {!addCVMode ? (
                  <Button
                    className="positive--custom--inverted"
                    content="Add CV"
                    onClick={() => setAddCVMode(true)}
                    floated="right"
                    style={{ marginBottom: "1.2em" }}
                  />
                ) : (
                  <>
                    <Button
                      className="positive--custom--inverted"
                      content="Cancel"
                      onClick={() => setAddCVMode(false)}
                      floated="right"
                      style={{ marginBottom: "1.2em" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "100%",
                      }}
                      // className="ui card"
                    >
                      <FileUploadWidget uploadFile={addCV} />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  className="positive--custom--inverted"
                  content="Change CV"
                  onClick={() => setAddCVMode(true)}
                  floated="right"
                  style={{ marginBottom: "1.2em" }}
                />
                {addCVMode ? (
                  <>
                    <Button
                      content="Cancel"
                      onClick={() => setAddCVMode(false)}
                    />
                    <FileUploadWidget uploadFile={addCV} />
                  </>
                ) : (
                  <div
                    className="file-thumbnail-container"
                    style={{ float: "right" }}
                  >
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
                  </div>
                )}
              </>
            )}
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
});
