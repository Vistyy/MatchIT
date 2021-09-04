import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { Cropper } from "react-cropper";
import { Button, Grid, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
  uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({ uploadPhoto }: Props) {
  const {
    profileStore: { loading, uploading },
  } = useStore();
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();
  const [loader, setLoader] = useState(false);

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    setLoader(loading || uploading);
  }, [loading, uploading]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize Image" />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload" />
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button
              loading={loader}
              onClick={onCrop}
              positive
              icon="check"
              style={{ width: "200px" }}
              attached="bottom"
            />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
