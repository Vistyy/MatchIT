import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Icon,
  Item,
  Segment,
  Transition,
  Image,
} from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  const {
    modalStore,
    profileStore: { uploadPhoto, deletePhoto },
  } = useStore();
  const [visible, setVisible] = useState(false);

  function handlePhotoChange(file: Blob) {
    if (profile.image) {
      deletePhoto(profile.image)
        .then(() => uploadPhoto(file))
        .then(() => modalStore.closeModal());
    } else {
      uploadPhoto(file).then(() => modalStore.closeModal());
    }
  }

  function handleShow() {
    setVisible(true);
  }

  function handleHide() {
    setVisible(false);
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width="12">
          <Item.Group>
            <Item
              style={{ position: "relative" }}
              onMouseEnter={handleShow}
              onMouseLeave={handleHide}
            >
              <Item.Image size="small">
                <Image
                  src={profile.image?.url || "/assets/user.png"}
                  style={{
                    border: "1px solid #eaeaea",
                  }}
                />
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
              </Item.Image>
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width="4"></Grid.Column>
      </Grid>
    </Segment>
  );
});
